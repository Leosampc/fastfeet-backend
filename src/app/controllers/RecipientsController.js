import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number(),
            address_complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            postal_code: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const {
            id,
            name,
            street,
            number,
            address_complement,
            state,
            city,
            postal_code,
        } = await Recipients.create(req.body);

        return res.json({
            id,
            name,
            street,
            number,
            address_complement,
            state,
            city,
            postal_code,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.number(),
            address_complement: Yup.string(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            postal_code: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });

        const { id } = req.params;

        const recipient = await Recipients.findByPk(id);

        if (!recipient)
            return res.status(400).json({ error: 'Recipient not found' });

        const {
            name,
            street,
            number,
            address_complement,
            state,
            city,
            postal_code,
        } = await recipient.update(req.body);

        return res.json({
            id,
            name,
            street,
            number,
            address_complement,
            state,
            city,
            postal_code,
        });
    }
}

export default new RecipientsController();
