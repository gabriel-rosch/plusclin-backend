import Specialties from '../models/Specialties';
import User from '../models/User';

class SpecialtiesController {
  async index(req, res) {
    return res.json(await Specialties.findAll({where:{used: true}}));
  }
  async indexName(req, res) {
    const checkSpecialties = await Specialties.findOne({where:{key: req.query.name}});
    if(checkSpecialties) {
      return res.status(200).json(checkSpecialties);
    }else{
      return res.status(404).json('not found');
    }
  }
  async indexId(req, res) {
    const specialties = await Specialties.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          as: 'users',
        },
      ],
    });
    return res.json(specialties);
  }

  async initDatabase() {
    const specialties = [
      'ACUPUNTURA',
      'ADMINISTRAÇÃO EM SAÚDE',
      'ADMINISTRAÇÃO HOSPITALAR',
      'ALERGIA E IMUNOLOGIA',
      'ALERGIA E IMUNOPATOLOGIA',
      'ANATOMIA PATOLÓGICA',
      'ANESTESIOLOGIA',
      'ANGIOLOGIA',
      'ANGIOLOGIA E CIRURGIA VASCULAR',
      'BRONCOESOFAGOLOGIA',
      'CANCEROLOGIA',
      'CANCEROLOGIA/CANCEROLOGIA CIRÚRGICA',
      'CANCEROLOGIA/CANCEROLOGIA PEDIÁTRICA',
      'CARDIOLOGIA   8CIRURGIA CARDIOVASCULAR',
      'CIRURGIA DA MÃO',
      'CIRURGIA DE CABEÇA E PESCOÇO',
      'CIRURGIA DIGESTIVA',
      'CIRURGIA DO APARELHO DIGESTIVO',
      'CIRURGIA DO TRAUMA ',
      'CIRURGIA GASTROENTEROLÓGICA',
      'CIRURGIA GERAL',
      'CIRURGIA ONCOLÓGICA',
      'CIRURGIA PEDIÁTRICA',
      'CIRURGIA PLÁSTICA',
      'CIRURGIA TORÁCICA',
      'CIRURGIA TORÁXICA',
      'CIRURGIA VASCULAR',
      'CIRURGIA VASCULAR PERIFÉRICA',
      'CITOPATOLOGIA',
      'CLÍNICA MÉDICA',
      'COLOPROCTOLOGIA',
      'DENSITOMETRIA ÓSSEA',
      'DERMATOLOGIA',
      'DIAGNÓSTICO POR IMAGEM',
      'DOENÇAS INFECCIOSAS E PARASITÁRIAS',
      'ELETROENCEFALOGRAFIA',
      'ENDOCRINOLOGIA',
      'ENDOCRINOLOGIA E METABOLOGIA',
      'ENDOSCOPIA',
      'ENDOSCOPIA DIGESTIVA',
      'ENDOSCOPIA PERORAL',
      'ENDOSCOPIA PERORAL VIAS AÉREAS',
      'FISIATRIA',
      'FONIATRIA',
      'GASTROENTEROLOGIA',
      'GENÉTICA CLÍNICA',
      'GENÉTICA LABORATORIAL',
      'GENÉTICA MÉDICA',
      'GERIATRIA',
      'GERIATRIA E GERONTOLOGIA',
      'GINECOLOGIA',
      'GINECOLOGIA E OBSTETRÍCIA',
      'HANSENOLOGIA',
      'HEMATOLOGIA',
      'HEMATOLOGIA E HEMOTERAPIA',
      'HEMOTERAPIA',
      'HEPATOLOGIA',
      'HOMEOPATIA',
      'IMUNOLOGIA CLÍNICA',
      'INFECTOLOGIA',
      'INFORMÁTICA MÉDICA',
      'MASTOLOGIA',
      'MEDICINA DE EMERGÊNCIA',
      'MEDICINA DE FAMÍLIA E COMUNIDADE',
      'MEDICINA DE TRÁFEGO',
      'MEDICINA DO ADOLESCENTE',
      'MEDICINA DO ESPORTE',
      'MEDICINA DO TRABALHO',
      'MEDICINA ESPORTIVA',
      'MEDICINA FÍSICA E REABILITAÇÃO',
      'MEDICINA GERAL COMUNITÁRIA',
      'MEDICINA INTENSIVA',
      'MEDICINA INTERNA OU CLÍNICA MÉDICA',
      'MEDICINA LEGAL',
      'MEDICINA LEGAL E PERÍCIA MÉDICA',
      'MEDICINA NUCLEAR',
      'MEDICINA PREVENTIVA E SOCIAL',
      'MEDICINA SANITÁRIA',
      'NEFROLOGIA',
      'NEUROCIRURGIA',
      'NEUROFISIOLOGIA CLÍNICA',
      'NEUROLOGIA',
      'NEUROLOGIA PEDIÁTRICA',
      'NEUROPEDIATRIA',
      'NUTRIÇÃO PARENTERAL E ENTERAL',
      'NUTROLOGIA',
      'OBSTETRÍCIA',
      'OFTALMOLOGIA',
      'ONCOLOGIA',
      'ONCOLOGIA CLÍNICA',
      'ORTOPEDIA E TRAUMATOLOGIA',
      'OTORRINOLARINGOLOGIA',
      'PATOLOGIA',
      'PATOLOGIA CLÍNICA',
      'PATOLOGIA CLÍNICA MEDICINA LABORATORIAL',
      'PEDIATRIA',
      'PNEUMOLOGIA',
      'PNEUMOLOGIA E TISIOLOGIA',
      'PROCTOLOGIA',
      'PSIQUIATRIA',
      'PSIQUIATRIA INFANTIL',
      'RADIODIAGNÓSTICO',
      'RADIOLOGIA',
      'RADIOLOGIA E DIAGNÓSTICO POR IMAGEM',
      'RADIOTERAPIA',
      'REUMATOLOGIA',
      'SEXOLOGIA',
      'TERAPIA INTENSIVA',
      'TERAPIA INTENSIVA PEDIÁTRICA',
      'TISIOLOGIA',
      'TOCO-GINECOLOGIA',
      'ULTRASSONOGRAFIA',
      'ULTRASSONOGRAFIA EM GINECOLOGIA E OBSTETRÍCIA',
      'ULTRASSONOGRAFIA GERAL',
      'UROLOGIA',
    ];
    specialties.forEach(x => Specialties.create({ name: x, key: this.removeAcento(x.trim())}));
  }

  removeAcento(text)
  {
    text = text.toLowerCase();
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    text = text.replace(new RegExp('[ ]','gi'), '');
    return text;
  }
}
export default new SpecialtiesController();
