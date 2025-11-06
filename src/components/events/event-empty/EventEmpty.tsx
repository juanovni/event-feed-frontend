
interface Props {
  type: 'event' | 'followers';
}

export const EventEmpty = ({ type }: Props) => {
  if (type === 'event') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 rounded-full bg-muted/50 mb-4">
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          No hay eventos todavía
        </h2>
        <p className="text-muted-foreground max-w-md">
          En cuanto alguien publique un evento, aparecerá aquí.
        </p>
      </div>
    )
  }

  if (type == 'followers') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 rounded-full bg-muted/50 mb-4">
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          ¡Tu feed está un poco vacío!
        </h2>
        <p className="text-muted-foreground max-w-md">
          Comienza a seguir a otras cuentas para ver sus eventos más recientes.
        </p>
      </div>
    )
  }

}
