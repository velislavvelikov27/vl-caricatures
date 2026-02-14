type Size = "A4_21x30" | "30x40";

export function calcPriceEUR(opts: {
  size: Size;
  faces: number;
  frame: boolean;
  customIdea: boolean;
}) {
  const { size, faces, frame, customIdea } = opts;

  const baseTable: Record<Size, Record<number, { noFrame: number; withFrame: number }>> = {
    A4_21x30: {
      1: { noFrame: 25, withFrame: 30 },
      2: { noFrame: 30, withFrame: 35 },
      3: { noFrame: 35, withFrame: 40 },
      4: { noFrame: 40, withFrame: 45 },
    },
    "30x40": {
      1: { noFrame: 35, withFrame: 40 },
      2: { noFrame: 40, withFrame: 45 },
      3: { noFrame: 45, withFrame: 50 },
      4: { noFrame: 50, withFrame: 55 },
    },
  };

  const facesKey = Math.min(faces, 4);
  const base = baseTable[size][facesKey];
  let price = frame ? base.withFrame : base.noFrame;

  if (faces > 4) price += (faces - 4) * 5;
  if (customIdea) price += 5;

  return price;
}
