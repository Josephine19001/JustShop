import React from "react";
import PolicyQuestContainer from './PolicyContainer'
import "./style.css";

const policies = [
  {
    name: "1. Do I need to have a Return Policy?",
    description:
      "While there isn't a law requiring ecommerce stores to have a Return Policy, you may need one if you wish to enforce your terms and parameters of returns and refunds. For example, in the state of New York, if a retailer does not provide a Return & Refund Policy, the retailer will be required to accept returns and give refunds for all merchandise returned within 30 days of purchase. If you wish to limit this in any way, you will need to create and post a Return Policy with your own custom terms. Another reason for having a Return Policy even if not required by law is that most consumers prefer to shop at retailers with a clearly-posted Return Policy. This is especially important when shopping online, as more issues are likely when purchasing something without being able to see it in person first. If you don't have a Return Policy, you may be at the mercy of state laws regulating return and refund timeframes. You may also lose potential customers who are concerned about not being able to return a product if they need or want to."
  },
  {
    name: "2. What are the main benefits of having a Return Policy?",
    description:
      "While there isn't a law requiring ecommerce stores to have a Return Policy, you may need one if you wish to enforce your terms and parameters of returns and refunds. For example, in the state of New York, if a retailer does not provide a Return & Refund Policy, the retailer will be required to accept returns and give refunds for all merchandise returned within 30 days of purchase. If you wish to limit this in any way, you will need to create and post a Return Policy with your own custom terms. Another reason for having a Return Policy even if not required by law is that most consumers prefer to shop at retailers with a clearly-posted Return Policy. This is especially important when shopping online, as more issues are likely when purchasing something without being able to see it in person first. If you don't have a Return Policy, you may be at the mercy of state laws regulating return and refund timeframes. You may also lose potential customers who are concerned about not being able to return a product if they need or want to."
 },
  {
    name: "3. Sample 1",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
  },
  {
    name: "4. Sample 1",
    description:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source."
  }
];

export default function ReturnPolicy() {
  return (
    <div className="App">
      {policies.map((policy) => {
        return (
          <PolicyQuestContainer
            name={policy.name}
            description={policy.description}
          />
        );
      })}
    </div>
  );
}
