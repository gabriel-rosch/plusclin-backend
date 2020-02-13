import Appointment from '../models/Appointment';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import * as Yup from 'yup';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';
import pt from 'date-fns/locale/pt';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class AppointmentController {
  async index(req, res) {
    //padrao pagina 1
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { canceled_at: null, user_id: req.userId },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable'],
      // Lista no maximo 20 registros por vez
      limit: 20,
      //Quantos registro vai pular
      offset: (page - 1) * 20,
      // Adiciona provider
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
      provider_id: Yup.number().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;
    // Verifica se id do provedor é realmente um provider
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    // Se não for provider retorna mensagem de erro
    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'You can only create appointments with providers' });
    }
    // StartOfHour arredonda minutos para 00
    // Parse iso converte data string da api pra Date
    const hourStart = startOfHour(parseISO(date));

    // se data ja pasou, (deve ser data futura)
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates ate not permitted' });
    }

    //Verificar se provider já reservou horario
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    // Horario não esta vago
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    // Salva novo registro
    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    // const user = await User.findByPk(req.userId);
    // const formattedDate = format(
    //   hourStart,
    //   "'dia' dd 'de' MMMM', às' H:mm'h'",
    //   { locale: pt }
    // );
    //
    // await Notification.create({
    //   content: `Novo agendamento de ${user.name} para ${formattedDate}`,
    //   user: provider_id,
    // });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id != req.userId) {
      return req.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }

    //Remove 2 hrs do horario do agendamento
    const dateWithSub = subHours(appointment.date, 2);

    // horario limite para cancelamento (2hr) já passou
    if (isBefore(dateWithSub, new Date())) {
      return req.status(401).json({
        error: 'You can only cancel appointment 2 hour in advance.',
      });
    }
    //Cancela o agendamento
    appointment.canceled_at = new Date();

    await appointment.save();

    await Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.json(appointment);
  }
}
export default new AppointmentController();
