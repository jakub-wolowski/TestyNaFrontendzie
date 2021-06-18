import { useSelector, useService } from "@xstate/react";
import React, { useContext } from "react";

import styled from "styled-components";
import ListHeader from "../atoms/ListHeader";
import { Cell, Name, Row } from "../atoms/Row";
import { MachineContext } from "../MachineContext";
import { getDiscountedSum } from "../state/selectors";
import { shipmentMethods } from "../types/ShipmentMethod";
import { displayPrice } from "../utils/money";
import { getCurrentPrice } from "../utils/getCurrentPrice";
import {useCurrency} from "../currencyContext/CurrencyContext";

const DeliveryContainer = styled.section`
  margin-top: 20px;
`;

const Delivery = (): JSX.Element => {
  const { state: {selectedCurrency} } = useCurrency();
  const machine = useContext(MachineContext);
  const [current, send] = useService(machine);
  const shipment = current.context.shipmentMethod;
  const discountedSum = useSelector(machine, getDiscountedSum);

  return (
    <DeliveryContainer>
      <ListHeader>Dostawa</ListHeader>
      {shipmentMethods.map((method) => {
        const isNotFreeDelivery =
          getCurrentPrice(discountedSum, selectedCurrency) <
          ((method && getCurrentPrice(method.freeFrom, selectedCurrency)) ??
            Infinity);
        return (
          <Row key={method.type}>
            <Name>
              <label htmlFor={method.type}>
                <input
                  type="radio"
                  name="shipment"
                  id={method.type}
                  value={method.type}
                  checked={shipment?.type === method.type}
                  onChange={() =>
                    send("CHOOSE_SHIPMENT", { methodType: method.type })
                  }
                />
                {method.name}
              </label>
            </Name>
            <Cell>
              {isNotFreeDelivery ? displayPrice(method.price) : "darmowa"}
            </Cell>
          </Row>
        );
      })}
    </DeliveryContainer>
  );
};

export default Delivery;
