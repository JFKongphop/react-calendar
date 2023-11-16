import hre, { ethers } from 'hardhat';

const deploy = async () => {
  const Calendar = await ethers.getContractFactory('Calendar');
  const calendar = await Calendar.deploy();

  await calendar.deployTransaction.wait(5);
  console.log('ADDRESS', calendar.address);

  try {
    await hre.run('verify:verify', {
      address: calendar.address,
      contract: 'contracts/Calendar.sol:Calendar'
    });
  }
  catch (e) {
    console.log(e)
  }
}

deploy().catch((err) => {
  console.log(err),
  process.exitCode = 1;
})
