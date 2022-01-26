import React from "react";
import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import ListElement from "../ListElement";
import { getProducts } from "../../mocks/getProducts";
import { CartItem } from "../../state";
import { Product } from "../../types/Product";
import { displayPrice } from "../../utils/money";

describe("<ListElement />", () => {
    const prepareCartItemName = (product: Product) : string => {
        return `${product.name} - ${product.brand}`;
    }
    const product: Product = getProducts()[0];
    const cartItem: CartItem = {
        id: product._id,
        name: prepareCartItemName(product),
        price: product.price,
        quantity: 1
    }

    it('should show product name', () => {
        render(<ListElement product={cartItem} onRemove={jest.fn} onAdd={jest.fn()} />);
        expect(screen.getByText(prepareCartItemName(product))).not.toBeNull();
    })

    it('should show product price', () => {
        render(<ListElement product={cartItem} onRemove={jest.fn} onAdd={jest.fn()} />);
        expect(screen.getByTestId('unitPrice').textContent).toBe(displayPrice(product.price));
        expect(screen.getByTestId('totalPrice').textContent).toBe(displayPrice(product.price));
    })

    it('should call remove() when clicking on "-1"', () => {
        const onRemoveMock = jest.fn()
        render(<ListElement product={cartItem} onRemove={onRemoveMock} onAdd={jest.fn()} />);

        const removeButton = screen.getByText('-1');
        user.click(removeButton);

        expect(onRemoveMock).toHaveBeenCalledTimes(1);
    })

    it('should call add() when clicking on "+1"', () => {
        const onAddMock = jest.fn()
        render(<ListElement product={cartItem} onRemove={jest.fn()} onAdd={onAddMock} />);

        const addButton = screen.getByText('+1');
        user.click(addButton);

        expect(onAddMock).toHaveBeenCalledTimes(1);
    })

    it('should calculate total price', () => {
        const quantity = 3;
        cartItem.quantity = quantity;
        render(<ListElement product={cartItem} onRemove={jest.fn} onAdd={jest.fn()} />);
        expect(screen.getByTestId('totalPrice').textContent).toBe(displayPrice(product.price * quantity));
    })
});