import FormEntry from '../models/FormEntry.js';

export const getForms = async (req, res) => {
  try {
    const forms = await FormEntry.find({}).sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const submitForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message, formType } = req.body;

    const formEntry = new FormEntry({
      name,
      email,
      phone,
      subject,
      message,
      formType,
    });

    const createdForm = await formEntry.save();
    
    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.emit('notification', {
        id: new Date().getTime(),
        title: `New ${formType || 'Contact'} Form Submission`,
        message: `You received a new message from ${name}.`,
        isRead: false
      });
    }

    res.status(201).json(createdForm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFormStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const form = await FormEntry.findById(req.params.id);

    if (form) {
      form.status = status || form.status;
      const updatedForm = await form.save();
      res.json(updatedForm);
    } else {
      res.status(404).json({ message: 'Form entry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const form = await FormEntry.findById(req.params.id);

    if (form) {
      await FormEntry.deleteOne({ _id: form._id });
      res.json({ message: 'Form entry removed' });
    } else {
      res.status(404).json({ message: 'Form entry not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
