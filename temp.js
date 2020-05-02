const myCustomErr = (arg) => {
  if (arg === 2) {
    return "Hello";
  } else {
    throw {
      name: "Undefined Error",
      message: "Something Happened",
      arg: "Should be === 2",
    };
  }
};

const callerFunction = () => {
  try {
    myCustomErr(3);
  } catch (err) {
    console.log(err.arg);
  }
};

callerFunction();
