import { Promotion } from "../types/Promotion";

export const getTheBestPromotionForDate = (
  date: Date,
  promotions: Promotion[]
): Promotion | null => {
  const currentPromotions = promotions.filter(
    (prom: Promotion) => prom.dateStart < date && prom.dateEnd > date
  );

  if (currentPromotions.length === 0) {
    return null;
  }

  const sortedPromotions = currentPromotions.sort((next, prev) =>
    next.discount.percentage < prev.discount.percentage ? 1 : -1
  );

  return sortedPromotions[0];
};
