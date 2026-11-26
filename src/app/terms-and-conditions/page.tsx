import Link from "next/link";

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background px-5 py-12 text-foreground sm:py-16">
      <article className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-3 border-b pb-8">
          <Link href="/" className="text-sm font-medium underline underline-offset-4">QueBuenPlan</Link>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Términos y condiciones</h1>
          <p className="text-sm text-muted-foreground">Compra de entradas para eventos</p>
        </header>

        <div className="rounded-lg border bg-muted/40 p-4 text-sm">
          Este texto está en revisión. Las condiciones de cambios y devoluciones deben completarse antes de habilitar ventas.
        </div>

        <section className="space-y-3"><h2 className="text-xl font-semibold">1. La plataforma y los eventos</h2><p>QueBuenPlan permite consultar eventos y gestionar la compra de entradas digitales. Cada evento presenta información sobre su organizador, fecha, lugar, tipos de entrada, precios y disponibilidad.</p><p>El organizador es responsable de la realización y las condiciones de acceso a su evento. Revisa la información del evento antes de confirmar tu compra.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">2. Selección y precio</h2><p>Selecciona el tipo y la cantidad de entradas. Antes de continuar al pago verás el subtotal, el IVA aplicable y el total. La disponibilidad y el importe se verifican al preparar la compra.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">3. Pago y confirmación</h2><p>Los pagos se procesan mediante PayPhone. La compra queda confirmada cuando se verifica la aprobación del pago. En ese momento podrás consultar tus entradas en tu cuenta.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">4. Entradas digitales y acceso</h2><p>Las entradas se consultan desde la cuenta utilizada en la compra. Presenta el código de acceso y cualquier documento que el organizador requiera para ingresar. Mantén tu código protegido para evitar su uso por terceros.</p><p>Las condiciones de edad, horarios, objetos permitidos y acceso son las informadas para cada evento por su organizador.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">5. Cambios, cancelaciones y devoluciones</h2><p>QueBuenPlan gestionará las devoluciones de dinero a los compradores. Las solicitudes relacionadas con cambios, suspensión o cancelación de eventos se atenderán conforme a las condiciones informadas para el evento y a la normativa aplicable. Los plazos y el procedimiento de devolución se detallarán en esta sección.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">6. Datos de compra y facturación</h2><p>Solicitamos los datos de contacto y facturación para gestionar la compra. La emisión de comprobantes electrónicos está pendiente de implementación. Los datos proporcionados deben ser correctos y estar actualizados.</p></section>
        <section className="space-y-3"><h2 className="text-xl font-semibold">7. Consultas</h2><p>QueBuenPlan · RUC 0930114061001 · Correo de atención: quebuenplanec@gmail.com.</p></section>
      </article>
    </main>
  );
}
