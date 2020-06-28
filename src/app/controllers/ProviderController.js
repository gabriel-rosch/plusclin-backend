import User from '../models/User';
import File from '../models/File';
import Specialties from "../models/Specialties";
class ProvideController {
  async index(req, res) {
    const providers = await User.findAll({
      where: { provider: true },
      //Atributos q eu quero ver na tela
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(providers);
  }
  async indexSpecialties(req, res) {
    const providerSpecialties = await User.findOne({
          where: {id: req.params.id, provider: true},
          attributes: ['name'],
          include: [
            {
              model: Specialties,
              as: 'specialties',
              attributes: ['name'],
            },
          ],
        })
    const specialties = providerSpecialties.specialties.map(x => x.name);
    let stringSpecialties = '';
    for (let i = 0; i < specialties.length ; i++) {
      if(specialties.length !== i + 1){
        stringSpecialties = stringSpecialties + specialties[i] + ", "
      } else {
        stringSpecialties = stringSpecialties + specialties[i];
      }
    }
    return res.json({stringSpecialties: stringSpecialties});

  }

}
export default new ProvideController();
