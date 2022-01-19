import { getTheBestPromotionForDate } from "../getTheBestPromotionForDate";
import { getPromotions } from "../../mocks/getPromotion";

describe ('getTheBestPromotionForDate', () => {

    const promotions = getPromotions(); 

    it('should return null when there is no current promotion', () =>{
        const promo = getTheBestPromotionForDate(new Date('2020-12-01'), promotions);
        expect(promo).toBeNull();
    });

    it.each([
        ['2021-01-02', 10],
        ['2021-12-24', 25],
        ['2021-06-10', 45],
        ['2021-06-26', 10]])
    ('on %s returns discount of %i%', (date, expectedDiscount) => {
        const promo = getTheBestPromotionForDate(new Date(date), promotions);
        expect(promo?.discount.percentage).toBe(expectedDiscount);
    });

});