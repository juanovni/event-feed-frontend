import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const TicketEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="p-4 rounded-full bg-muted/50 mb-4">
      </div>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Acceso no encontrado
      </h2>
      <p className="text-muted-foreground max-w-md mb-4">
        Puede que este acceso ya no exista o que todavia no se haya confirmado tu asistencia.
      </p>
      <Link href="/tickets">
        <Button
          size={"lg"}
          variant="default">
          Volver a mis accesos
        </Button>
      </Link>
    </div>
  )
}
