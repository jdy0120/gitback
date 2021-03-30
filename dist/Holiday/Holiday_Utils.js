"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHoliday = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const apis = {
    EndPoint: `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo`,
    Enecoding: `Do%2BqAYkzRDsfuWpJN8MRsmQIXjK06hUAMvVReJqqT1MvyKvc%2Ft9eFJU19fHpZZ9j88%2BVYi9AgtBVgibkdVwhXA%3D%3D`
};
const getHoliday = (year) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (yield node_fetch_1.default(`${apis.EndPoint}?serviceKey=${apis.Enecoding}&solYear=${year}&_type=json`)).json();
    return yield response.response.body.items;
});
exports.getHoliday = getHoliday;
