import { BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import {
  ICYMONEY,
  Approval,
  AutoLiquify,
  OwnershipTransferred,
  Transfer
} from "../generated/ICYMONEY/ICYMONEY"
import { TransferEvent } from "../generated/schema"

export function handleApproval(event: Approval): void {}

export function handleAutoLiquify(event: AutoLiquify): void { }

export function handleOwnershipTransferred(event: OwnershipTransferred): void { }

export function toDecimal(value: BigInt, decimals: u32): BigDecimal {
  let precision = BigInt.fromI32(10)
    .pow(<u8>decimals)
    .toBigDecimal()
  return value.divDecimal(precision)
}

export function handleTransfer(event: Transfer): void {
  let entity = new TransferEvent(event.transaction.from.toHex() + "-" + event.logIndex.toString())
  entity.amount = toDecimal(event.params.value, 6)
  entity.source = event.params.from
  entity.destination = event.params.to
  entity.block = event.block.number
  entity.timestamp = event.block.timestamp
  entity.transaction = event.transaction.hash
  entity.save()
}
