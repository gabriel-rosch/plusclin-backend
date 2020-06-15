import Clinic from '../models/Clinic';
import Address from '../models/Address';
import * as Yup from 'yup';
import User from "../models/User";
import Specialties from "../models/Specialties";
import File from "../models/File";
import Appointment from "../models/Appointment";
import {Op} from "sequelize";
import {endOfDay, format, isAfter, setHours, setMinutes, setSeconds, startOfDay} from "date-fns";
import QueryValue from "../models/QueryValue";


class ClinicController {
    async index(req, res) {
        const clinics = await Clinic.findAll({
            attributes: ['id', 'name'],
            limit: 20,
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'avatar_id'],
                    include: [
                        {
                            where: {id: req.query.specialties_id},
                            attributes: ['id'],
                            through: {attributes: []},
                            as: 'specialties',
                            model: Specialties
                        }
                    ],
                },
                {
                    model: File,
                    as: 'avatar',
                    attributes: ['name', 'path', 'url'],
                },
                {
                    model: Address,
                    as: 'addresses',
                    attributes: ['city','number','state', 'cep','street'],
                    where: {city: req.query.city}
                }
            ],
        });
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ error: 'Ivalid date' });
        }
        const searchDate = Number(date);
        const objReturn = []
        for (const clinic of clinics ) {

            const appointments = await Appointment.findAll({
                where: {
                    provider_id: clinic.Users[0].id,
                    canceled_at: null,
                    date: {
                        [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
                    },
                },
            });
            const schedule = [
                '08:00',
                '09:00',
                '10:00',
                '11:00',
                '12:00',
                '13:00',
                '14:00',
                '15:00',
                '16:00',
                '17:00',
                '18:00',
                '19:00',
            ];
            schedule.find(time => {
                const [hour, minute] = time.split(':');
                const value = setSeconds(
                    setMinutes(setHours(searchDate, hour), minute),
                    0
                );
                if (isAfter(value, new Date()) &&
                    !appointments.find(a => format(a.date, 'HH:mm') === time)) {
                    objReturn.push(clinic);
                    return true;
                }
            })
        }
        res.json(objReturn)
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
            //Address
            state: Yup.string()
                .length(2)
                .required(),
            city: Yup.string().required(),
            cep: Yup.string()
                .length(9)
                .required(),
            street: Yup.string().required(),
            number: Yup.number().required(),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'});
        }
        const {
            name,
            email,
            password,
            state,
            city,
            cep,
            street,
            number,
        } = req.body;

        const checkName = await Clinic.findOne({
            where: {name: name},
        });
        if (checkName) {
            return res
                .status(401)
                .json({error: 'You can only create clinic with that name'});
        }
        const checkEmail = await Clinic.findOne({
            where: {email: email},
        });
        if (checkEmail) {
            return res
                .status(401)
                .json({error: 'You can only create clinic with that email'});
        }

        //Validate Address
        const address = await Address.create(req.body);

        const clinic = await Clinic.create({...req.body, address_id: address.id});
        return res.json([{clinic: clinic, address: address}]);
    }
    async storeQueryValue(req,res) {
        const { value, clinic_id, specialties_id} = req.body;
        const clinic = await Clinic.findOne({where:{id: clinic_id}});
        if(!clinic) {
            return res.status(404).send('Clinic not found');
        }
        const specialties = await Specialties.findOne({where:{id: specialties_id}});
        if(!specialties) {
            return res.status(404).send('Specialties not found');
        }
        const queryValues = await clinic.addSpecialties(specialties);
        const queryvalue = await QueryValue.findOne({where:{id: queryValues[0].id}})
        queryvalue.value = value;
        return res.status(200).json(await queryvalue.save());
    }
}

export default new ClinicController();
