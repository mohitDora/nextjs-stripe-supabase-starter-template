"use client";

import { BuyButton } from '@/components/shared/buy-button';
import React from 'react'

interface productDetails{
    name: string;
    priceId: string;
    description: string;
}

const products: productDetails[] = [{
    name: "Test-Plan",
    priceId: "prod_SROtN1soNsAUlr",
    description: "This is my test plan",
},
{
    name: "Pro-Plan",
    priceId: "prod_SROqxYbjFqeQw2",
    description: "This is my pro plan",
},
{
    name: "Premium-Plan",
    priceId: "prod_SROs9sr4sBasyh",
    description: "This is my premium plan",
}
];

const payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div key={product.priceId}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <BuyButton priceId={product.priceId} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default payment