import MedicalRecord from "../models/MedicalRecord";

class MedicalRecordController {
    async index(req, res) {
        const { appointment_id } = req.params;
        const medicalRecord = await MedicalRecord.findOne({
            where: {appointment_id: appointment_id}
        })
        if(!medicalRecord) {
            return res.status(404).send('not found');
        }
        return res.status(200).send(medicalRecord)
    }
    async store(req, res) {
        const { text, appointment_id } = req.body;
        let medicalRecord = await MedicalRecord.findOne({
            where: {appointment_id: appointment_id}
        })
        if(!medicalRecord) {
            medicalRecord = await MedicalRecord.create({
                text,
                appointment_id,
            });
        } else {
            await medicalRecord.update({
                text,
                appointment_id,
            });
        }
        return res.json(medicalRecord);
    }
    async update(req, res) {

    }
}
export default new MedicalRecordController();
