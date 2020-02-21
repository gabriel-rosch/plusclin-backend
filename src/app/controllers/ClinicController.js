import Clinic from '../models/Clinic';
import Address from '../models/Address';
import * as Yup from 'yup';
import User from "../models/User";
import Specialties from "../models/Specialties";
import File from "../models/File";

class ClinicController {
    async index(req, res) {
        const schema = Yup.object().shape({
            specialties_id: Yup.number().required(),
            city: Yup.string(),
            date: Yup.string()
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'});
        }

        const clinics = await Clinic.findAll({
            attributes: ['id', 'name'],
            limit: 20,
            include: [
                {
                    model: User,
                    attributes: ['id','name', 'avatar_id'],
                    include: [
                        {
                            where: {id: req.body.specialties_id},
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
            ],

        });
        res.json({ok: clinics});
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
}

export default new ClinicController();
