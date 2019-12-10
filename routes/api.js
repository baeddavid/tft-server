const express = require("express");
const router = express.Router();
const RiotApi = require("../api/Riot-Api");

router.get("/summoner/:puuid", RiotApi.getSummonerNameFromPuuid);
router.get("/history/:summonername", RiotApi.getSummonerTftMatchHistory);

module.exports = router;