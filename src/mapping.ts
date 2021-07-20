import { BigInt } from "@graphprotocol/graph-ts"
import {
  GardenOfInfiniteLove,
  FlowerPlanted
} from "../generated/GardenOfInfiniteLove/GardenOfInfiniteLove"
import { Octalily as OctalilyContract, SharingIsCaringCall, Transfer, UpOnlyCall, WaveOfLove  } from "../generated/templates/Octalily/Octalily";
import { Octalily, User } from "../generated/schema"
import { OwnershipTransferred } from "../generated/templates/Octalily/Owned";

export function handleFlowerPlanted(event: FlowerPlanted): void {
  let octalily = new Octalily(event.params.flower.toHexString());
  octalily.pairedToken = event.params.pairedToken;
  let octalilyContract = OctalilyContract.bind(event.params.flower);
  octalily.price = octalilyContract.price();

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

  octalily.owner = owner.id;
  octalily.owner2 = owner2.id;
  octalily.owner3 = owner3.id;
  octalily.save()
}

export function handleWaveOfLove(event: WaveOfLove): void {
  let octalily = Octalily.load(event.address.toHexString());
  let octalilyContract = OctalilyContract.bind(event.address);
  octalily.price = octalilyContract.price();
  
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

export function handleTransfer(event: Transfer): void {
  let octalily = Octalily.load(event.address.toHexString());
  let octalilyContract = OctalilyContract.bind(event.address);
  octalily.price = octalilyContract.price();
  octalily.save();
}
