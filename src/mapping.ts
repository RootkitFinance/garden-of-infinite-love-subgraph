import { BigInt} from '@graphprotocol/graph-ts'
import { FlowerPlanted } from '../generated/GardenOfInfiniteLove/GardenOfInfiniteLove'
import { 
  Octalily as OctalilyContract, 
  OwnershipTransferred, 
  SharingIsCaringCall, 
  WaveOfLove, 
  AnotherOctalilyBeginsToGrow,
  Transfer, 
  TransferOwnershipCall} from '../generated/templates/Octalily/Octalily'
import { Octalily, PairedToken, User } from '../generated/schema'

export function handleFlowerPlanted(event: FlowerPlanted): void {
  let octalilyContract = OctalilyContract.bind(event.params.flower);
  let octalily = new Octalily(event.params.flower.toHexString());

  let pairedToken = PairedToken.load(event.params.pairedToken.toHexString());
  if (pairedToken === null) {
    pairedToken = new PairedToken(event.params.pairedToken.toHexString());
    pairedToken.save();
  }

  let owner = User.load(octalilyContract.owner().toHexString());
  if (owner === null) {
    owner = new User(octalilyContract.owner().toHexString());
    owner.save();
  }

  let owner2 = User.load(octalilyContract.owner2().toHexString());
  if (owner2 === null) {
    owner2 = new User(octalilyContract.owner2().toHexString());
    owner2.save();
  }

  let owner3 = User.load(octalilyContract.owner3().toHexString());
  if (owner3 === null) {
    owner3 = new User(octalilyContract.owner3().toHexString());
    owner3.save();
  }

  octalily.price = octalilyContract.price();
  octalily.pairedToken = pairedToken.id;
  octalily.burnRate = octalilyContract.burnRate();
  octalily.totalFees = octalilyContract.totalFees();
  octalily.upPercent = octalilyContract.upPercent();
  octalily.upDelay = octalilyContract.upDelay();
  octalily.petalCount = BigInt.fromI32(0);
  octalily.owner = owner.id;
  octalily.owner2 = owner2.id;
  octalily.owner3 = owner3.id;

  octalily.save();
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {
  let octalily = Octalily.load(event.address.toHexString());
  let owner = User.load(event.params.newOwner.toHexString());
  if (owner === null) {
    owner = new User(event.params.newOwner.toHexString());
    owner.save();
  }

  octalily.owner = owner.id;
  octalily.save();
}

export function handleSetOwners(call: SharingIsCaringCall): void {
  let octalily = Octalily.load(call.to.toHexString());

  let owner2Address = call.inputValues[0].value.toAddress().toHexString();
  let owner2 = User.load(owner2Address);
  if (owner2 === null) {
    owner2 = new User(owner2Address);
    owner2.save();
  }

  let owner3Address = call.inputValues[1].value.toAddress().toHexString();
  let owner3 = User.load(owner3Address);
  if (owner3 === null) {
    owner3 = new User(owner3Address);
    owner3.save();
  }

  octalily.owner2 = owner2.id;
  octalily.owner3 = owner3.id;

  octalily.save();
}

export function handleWaveOfLove(event: WaveOfLove): void {
}

export function handlePetalGrown(event: AnotherOctalilyBeginsToGrow): void {
}

export function handleTransfer(event: Transfer): void {
}

export function handleTransferOwnership (call: TransferOwnershipCall): void {
}