import {startOfDay, endOfDay, parseISO, subHours, isBefore} from 'date-fns';

import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';
import Specialties from "../models/Specialties";

class ScheduleController {
  // Agendamento de uma data expecifica
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ erro: 'User is not a provider' });
    }
    const { date } = req.query;
    const parsedDate = parseISO(date);

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'provider',
          attributes: ['name'],
          include: [
            {
              model: Specialties,
              as: 'specialties',
              attributes: ['name', 'key'],
            },
          ]
        },
      ],
      order: ['date'],
    });

    return res.json({ appointments });
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

    if (appointment.provider_id != req.userId) {
      return req.status(401).json({
        error: "You don't have permission to cancel this appointment.",
      });
    }
    //Cancela o agendamento
    appointment.canceled_at = new Date();

    await appointment.save();

    // await Queue.add(CancellationMail.key, {
    //   appointment,
    // });

    return res.json(appointment);
  }
}
export default new ScheduleController();
