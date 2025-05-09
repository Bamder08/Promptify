import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import emailjs from "@emailjs/browser";

// Esquema de validación con Yup
const schema = yup.object().shape({
  from_name: yup.string().required("El nombre es obligatorio"),
  from_email: yup.string().email("Correo no válido").required("El correo es obligatorio"),
  message: yup.string().min(10, "El mensaje debe tener al menos 10 caracteres").required("Mensaje obligatorio"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      alert("Mensaje enviado ✅");
      reset();
    } catch (error) {
      console.error(error);
      alert("Error al enviar ❌");
    }
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gray-900 text-white text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Contáctame
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto space-y-6">
        <div className="text-left">
          <input
            {...register("from_name")}
            placeholder="Tu nombre"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          />
          {errors.from_name && <p className="text-red-400 text-sm mt-1">{errors.from_name.message}</p>}
        </div>

        <div className="text-left">
          <input
            {...register("from_email")}
            placeholder="Tu correo"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          />
          {errors.from_email && <p className="text-red-400 text-sm mt-1">{errors.from_email.message}</p>}
        </div>

        <div className="text-left">
          <textarea
            {...register("message")}
            rows="5"
            placeholder="Tu mensaje"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none"
          />
          {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg"
        >
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>
    </section>
  );
}

export default Contact;