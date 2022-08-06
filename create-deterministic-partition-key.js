const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";

const createHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const getStrigifiedPartitionKey = (partitionKey) => {
  return typeof partitionKey === "string"
    ? partitionKey
    : JSON.stringify(partitionKey);
};

exports.deterministicPartitionKey = (event, maxPartitionKeylength = 256) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  const { partitionKey } = event;
  if (!partitionKey) {
    return createHash(JSON.stringify(event));
  }

  const stringifiedPartitionKey = getStrigifiedPartitionKey(partitionKey);

  return stringifiedPartitionKey.length <= maxPartitionKeylength
    ? stringifiedPartitionKey
    : createHash(stringifiedPartitionKey);
};
