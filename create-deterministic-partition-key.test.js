const {
  deterministicPartitionKey,
} = require("./create-deterministic-partition-key");

describe("deterministicPartitionKey", () => {
  it(`Given no input
  Then deterministicPartitionKey should retunn "0"`, () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it(`Given an event as {partitionKey: "0"}
  Then deterministicPartitionKey should retunn "0"`, () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "0" });
    expect(trivialKey).toBe("0");
  });

  it(`Given an event as {partitionKey: "123"}
  Then deterministicPartitionKey should return "123"`, () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "123" });
    expect(trivialKey).toBe("123");
  });

  it(`Given an event as {partitionKey: 123}
  Then deterministicPartitionKey should return "123"`, () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 123 });
    expect(trivialKey).toBe("123");
  });

  it(`Given an event as {partitionKey: "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111"}
  Then deterministicPartitionKey should return the hash of partitionkey`, () => {
    const event = {
      partitionKey:
        "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
    };
    const expectedDeterministicKey =
      "b10110cfd56e16992eb184bc86785bf545e60df5a725bd363dd76d905eacbc39e8077b87e0d1663b3b5b108598531207b78988ba9fc5f88bb6f7361e023952ec";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedDeterministicKey);
  });

  it(`Given an event as {a: "12345666", b: 123}
  Then deterministicPartitionKey should return the hash of event`, () => {
    const event = { a: "12345666", b: 123 };
    const expectedDeterministicKey =
      "3e61ea97c80f79ead88be5a8c5567c91b7ebbb80c994c0c70969b80c1064fcd5aeba57ad8e4e869615660c0d0558e4fe33cc1ab2c7f16a3ca547a6ff52b2502d";
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(expectedDeterministicKey);
  });
});
