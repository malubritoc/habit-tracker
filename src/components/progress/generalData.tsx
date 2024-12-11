import clsx from "clsx";

export function GeneralData() {
  return (
    <div
      className={clsx(
        "flex flex-col gap-6",
        "px-8 py-6 rounded-2xl",
        "bg-baby-yellow"
      )}
    >
      <p className="font-medium">Todos os hábitos</p>
      <div className="flex flex-col text-sm">
        <p>
          Total de hábitos cadastrados: <strong>10000</strong>
        </p>
        <p>
          Total de hábitos cumpridos: <strong>5000</strong>
        </p>
      </div>
      <p className="text-sm text-default-gray font-medium">Resultados</p>
    </div>
  );
}
