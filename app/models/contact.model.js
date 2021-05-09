// modelando o banco de dados

module.exports = mongoose => {
  const Contact = mongoose.model(
    "contact",
    mongoose.Schema(
      {
        nome: {
          type: String,
          required: true,
          trim: true
        },
        telefone: {
          type: String,
          unique: true,
          trim: true,
          required: true,
          dropDups: true
        },
        email: {
          type: String,
          unique: true,
          required: true,
          lowercase: true,
          dropDups: true,
          trim: true,
        },
      },
      { timestamps: true }
    )
  );

  return Contact;
};