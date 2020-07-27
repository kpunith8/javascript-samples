import { createStatementData } from "./create-statement-data";

describe("create-statement-data", () => {
  const plays1 = {
    "1": { type: "tragedy", name: "Romeo Juliet" },
  };

  const invoice1 = {
    performances: [
      {
        playID: "1",
        audience: 300,
      },
    ],
    customer: "Punith K",
  };

  const plays2 = {
    "1": { type: "tragedy", name: "Romeo Juliet" },
    "2": { type: "comedy", name: "Comedy Of Errors" },
  };

  const invoice2 = {
    performances: [
      {
        playID: "1",
        audience: 300,
      },
      {
        playID: "2",
        audience: 190,
      },
    ],
    customer: "Punith K",
  };

  describe("when there is only one play in the invoice", () => {
    const statement = createStatementData(invoice1, plays1);

    const expectedResult = {
      customer: "Punith K",
      performances: [
        {
          playID: "1",
          audience: 300,
          play: {
            type: "tragedy",
            name: "Romeo Juliet",
          },
          amount: 310000,
          volumeCredits: 270,
        },
      ],
      totalAmount: 310000,
      totalVolumeCredits: 270,
    };
    it("should display the proper statement", () => {
      expect(statement).toEqual(expectedResult);
    });
  });

  describe("when there is 2 plays in the invoice", () => {
    const statement = createStatementData(invoice2, plays2);

    const expectedResult = {
      customer: "Punith K",
      performances: [
        {
          playID: "1",
          audience: 300,
          play: {
            type: "tragedy",
            name: "Romeo Juliet",
          },
          amount: 310000,
          volumeCredits: 270,
        },
        {
          playID: "2",
          audience: 190,
          play: {
            type: "comedy",
            name: "Comedy Of Errors",
          },
          amount: 182000,
          volumeCredits: 198,
        },
      ],
      totalAmount: 492000,
      totalVolumeCredits: 468,
    };

    it("should display the proper statement", () => {
      expect(statement).toEqual(expectedResult);
    });
  });
});
