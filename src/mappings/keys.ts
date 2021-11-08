import * as ERC1155 from "./1155";
import { log, store } from "@graphprotocol/graph-ts";
import {
  TransferBatch,
  TransferSingle,
  URI,
} from "../../generated/ERC1155/ERC1155";
import { getOrCreateCollection } from "../helpers";

export function handleTransferSingle(event: TransferSingle): void {
  let collection = getOrCreateCollection(event.address.toHexString());

  collection.name = "Keys";

  collection.save();

  // // // Remove Cats
  store.remove("Listing", "0x362b122b187b54161fe958ba67ec6e2927488a27-0x7dd3703d160b061813ccc8a0780257e6a21065d5-0x0");

  ERC1155.handleTransferSingle(event);
}

export function handleTransferBatch(event: TransferBatch): void {
  let params = event.params;

  log.info("[TransferBatch (from)]: {}", [params.from.toHexString()]);
  log.info("[TransferBatch (to)]: {}", [params.to.toHexString()]);
  log.info("[TransferBatch (ids)]: {}", [params.ids.join(", ")]);
  log.info("[TransferBatch (values)]: {}", [params.values.join(", ")]);
}

export function handleURI(event: URI): void {
  let params = event.params;

  log.info("[URI (id)]: {}", [params.id.toString()]);
  log.info("[URI (value)]: {}", [params.value]);
}