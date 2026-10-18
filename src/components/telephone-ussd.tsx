/* Illustration d'un téléphone composant le #808#, dessinée en CSS pour
   rester nette à toutes les tailles. */
export function TelephoneUssd({ code }: { code: string }) {
  const touches = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];
  return (
    <div aria-hidden className="relative mx-auto w-[15.5rem] rounded-[2.6rem] bg-marine p-3 shadow-[0_40px_80px_-30px_rgb(10_27_63/0.6)] ring-1 ring-white/10">
      <div className="rounded-[2rem] bg-white px-5 pb-6 pt-8">
        <div className="mx-auto mb-6 h-1.5 w-14 rounded-full bg-bordure" />
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-gris">FICA MOBILE</p>
        <p className="mt-2 text-center font-titre text-4xl font-extrabold tracking-wide text-marine">{code}</p>
        <p className="mt-1 text-center text-xs text-vert">Aucune connexion internet requise</p>
        <div className="mt-6 grid grid-cols-3 gap-2.5">
          {touches.map((t) => (
            <span
              key={t}
              className={`grid h-11 place-items-center rounded-full font-titre text-lg font-semibold ${
                code.includes(t) ? "bg-ciel text-bleu" : "bg-gris-clair text-marine/70"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <span className="mx-auto mt-5 grid size-12 place-items-center rounded-full bg-vert text-white">
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
