import * as Yup from 'yup';
import User from '../models/User';
import Specialties from '../models/Specialties';
import File from '../models/File';
import Clinic from "../models/Clinic";

class UserController {

    async indexSpecialties(req, res) {
        const checkUserProvider =
            await User.findAll({
                where: {id: req.userId, provider: true},
                include: [
                    {
                        model: Specialties,
                        as: 'specialties',
                        attributes: ['name'],
                    },
                ],
            })
        return res.json(checkUserProvider);
    }
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6)
        });
        //se retornar fase
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'});
        }
        console.log("1");
        const userExist = await User.findOne({where: {email: req.body.email}});
        console.log("2");
        if (userExist) {
            return res.status(400).json({error: 'user already exists.'});
        }

        if (req.body.avatar_id) {
            const avatarExist = await File.findOne({
                where: {id: req.body.avatar_id},
            });

            if (!avatarExist) {
                return res.status(400).json({error: 'avatar no already exists.'});
            }
        }
        if (req.body.clinic_id) {
            const clinic = await Clinic.findOne({
                where: {id: req.body.clinic_id},
            });
            if (!clinic) {
                return res.status(400).json({error: 'clinic no already exists.'});
            }
        }

        const {specialties, ...data} = req.body;
        if(specialties) {
            specialties.forEach(async x => {
                    const specialtie = await Specialties.findByPk(x);
                    specialtie.used = true;
                    await specialtie.save();
                }
            );
        }
        const user = await User.create({
            ...data,
            avatar_id: req.body.avatar_id,
        });

        const {id, email, name, provider, clinic_id} = user;
        if (user.provider) {
            user.setSpecialties(specialties);
            return res.json({
                id,
                email,
                name,
                provider,
                clinic_id,
                specialties
            });
        } else {
            return res.json({
                id,
                email,
                name,
                provider
            });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                //field == password, se oldPassword == preenchido
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            //oneOf igual a
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });
        //se retornar fase
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'});
        }
        // new data
        const {email, oldPassword} = req.body;
        // old data,
        const user = await User.findByPk(req.userId);
        // verifica se o email usuario já existe
        if (user.email != email) {
            const userExist = await User.findOne({where: {email}});
            if (userExist) {
                return res.status(400).json({error: 'user already exists.'});
            }
        }
        //Se senha estiver errada
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({error: 'password does not math'});
        }

        const {name, provider} = await user.update(req.body);

        return res.json({
            id: req.userId,
            email,
            name,
            provider,
        });
    }
}

export default new UserController();
