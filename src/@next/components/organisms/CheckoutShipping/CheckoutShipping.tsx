import { Formik } from "formik";
import React from "react";

import { ErrorMessage, Radio } from "@components/atoms";
import { Money } from "@components/containers";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Shipping method selector used in checkout.
 */
const CheckoutShipping: React.FC<IProps> = ({
  shippingMethods,
  selectedShippingMethodId,
  selectShippingMethod,
  errors,
  formId,
  formRef,
}: IProps) => {
  return (
    <section>
      <S.Title data-cy="checkoutPageSubtitle">SHIPPING METHOD</S.Title>
      <Formik
        initialValues={{
          shippingMethod: selectedShippingMethodId,
        }}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting }) => {
          // right now it's free shipping always this has to be changed once new shipping methods are introduced.
          if(selectShippingMethod && shippingMethods && shippingMethods[0] ){
            selectShippingMethod(shippingMethods[0].id);
          }
          // if (selectShippingMethod && values.shippingMethod) {
          //   selectShippingMethod(values.shippingMethod);
          // }
          setSubmitting(false);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
          values,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <S.ShippingMethodForm
              id={formId}
              ref={formRef}
              onSubmit={handleSubmit}
            >
              {shippingMethods.map(({ id, name, price }, index) => {
                // setFieldValue("shippingMethod", id);
                const checked =
                  !!values.shippingMethod && values.shippingMethod === id;
                return (
                  <S.Tile checked={checked} key={id}>
                    <Radio
                      data-cy={`checkoutShippingMethodOption${index}Input`}
                      name="shippingMethod"
                      value={id}
                      checked={true}
                      customLabel={true}
                      readOnly={true}
                      // onChange={() => setFieldValue("shippingMethod", id)}
                    >
                      <span
                        data-cy={`checkoutShippingMethodOption${index}Name`}
                      >
                        {name}
                      </span>
                      <S.Price>
                        {" "}
                        | +
                        {
                          <Money
                            data-cy={`checkoutShippingMethodOption${index}Price`}
                            money={price}
                          />
                        }
                      </S.Price>
                    </Radio>
                  </S.Tile>
                );
              })}
              <ErrorMessage errors={errors} />
            </S.ShippingMethodForm>
          );
        }}
      </Formik>
    </section>
  );
};

export { CheckoutShipping };
