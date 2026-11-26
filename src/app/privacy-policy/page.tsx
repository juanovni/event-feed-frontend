import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3 border-b pb-8">
          <Link href="/" className="text-sm font-medium underline underline-offset-4">QueBuenPlan</Link>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Política de privacidad</h1>
          <p className="text-sm text-muted-foreground">Tratamiento de datos personales en QueBuenPlan</p>
        </header>
        <div className="rounded-lg border bg-muted/40 p-4 text-sm">
          Este documento está en revisión. Debe completarse y revisarse antes de publicar la política definitiva.
        </div>
        <section className="space-y-3"><h2 className="text-xl font-semibold">Responsable y contacto</h2><p>QueBuenPlan · RUC 0930114061001. Para consultas o solicitudes sobre tus datos, escribe a <a className="underline underline-offset-4" href="mailto:quebuenplanec@gmail.com">quebuenplanec@gmail.com</a>.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">Datos que tratamos</h2><p>Al registrarte puedes proporcionar datos de cuenta y perfil, como nombre, correo, nombre de usuario, contraseña, teléfono, fecha de nacimiento, género, ubicación, intereses y fotografía. Los datos efectivamente solicitados pueden variar según la función que uses.</p><p>Al comprar entradas recopilamos la selección, los datos de contacto y facturación que introduces, el estado y los identificadores de la transacción. También tratamos información sobre eventos publicados, asistencia e interés cuando usas esas funciones.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">Para qué usamos los datos</h2><p>Utilizamos estos datos para gestionar tu cuenta, verificar tu correo, mostrar funciones de eventos, procesar compras, guardar los datos de facturación, confirmar pagos y gestionar entradas. También pueden utilizarse para atender consultas y cumplir obligaciones aplicables.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">Pagos y proveedores</h2><p>Cuando pagas una entrada, la transacción se procesa a través de PayPhone. PayPhone solicita los datos necesarios para procesar el pago en su formulario. La aplicación registra el resultado y los identificadores necesarios para relacionar el pago con la compra.</p><p>El sitio utiliza Cloudinary para alojar imágenes y un servicio de correo para enviar códigos de verificación. La información que aparece en tu perfil y la relacionada con eventos puede mostrarse a otros usuarios según las funciones de la plataforma.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">Almacenamiento en tu navegador</h2><p>La aplicación utiliza almacenamiento local del navegador para conservar información de sesión y de algunas funciones, como eventos y favoritos. Puedes borrar estos datos desde la configuración de tu navegador; hacerlo puede cerrar tu sesión o eliminar preferencias locales.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">Tus derechos y solicitudes</h2><p>Puedes solicitar información sobre el tratamiento de tus datos y ejercer los derechos que correspondan conforme a la normativa ecuatoriana, incluidos acceso, rectificación, eliminación, oposición y portabilidad, cuando sean aplicables. Para presentar una solicitud, escríbenos al correo indicado y describe tu petición.</p><p>También puedes acudir a la autoridad ecuatoriana de protección de datos personales si consideras que tus derechos no han sido atendidos.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">Conservación y seguridad</h2><p>Los plazos de conservación, los destinatarios concretos, las transferencias internacionales y las medidas aplicables deben completarse tras revisar la operación y los proveedores de QueBuenPlan. Algunas obligaciones legales pueden requerir conservar información durante períodos determinados.</p></section>
      </article>
    </main>
  );
}
