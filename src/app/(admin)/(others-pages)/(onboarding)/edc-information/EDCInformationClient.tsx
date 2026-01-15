"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EDCInformationClient() {
  const { t } = useTranslation();
  const [edcType, setEdcType] = useState("");
  const [edcCount, setEdcCount] = useState("");
  const [streetName, setStreetName] = useState("");
  const [rt, setRt] = useState("");
  const [rw, setRw] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <section className="min-h-[60vh]">
      <div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {t("onboarding.edcInformation.title")}
          </h1>
          <p className="text-sm text-gray-500">
            {t("onboarding.edcInformation.subtitle")}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="edcType">
              {t("onboarding.edcInformation.fields.edcType.label")}
            </label>
            <Select value={edcType} onValueChange={setEdcType}>
              <SelectTrigger id="edcType" className="mt-2 h-11 rounded-xl border-gray-200 px-4 text-sm">
                <SelectValue placeholder={t("onboarding.edcInformation.fields.edcType.placeholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="t6d">{t("onboarding.edcInformation.fields.edcType.options.t6d")}</SelectItem>
                <SelectItem value="topwise-t1-plus">
                  {t("onboarding.edcInformation.fields.edcType.options.topwiseT1Plus")}
                </SelectItem>
                <SelectItem value="topwise-q1">{t("onboarding.edcInformation.fields.edcType.options.topwiseQ1")}</SelectItem>
                <SelectItem value="centerm">{t("onboarding.edcInformation.fields.edcType.options.centerm")}</SelectItem>
                <SelectItem value="soundbox-newland-vb90s">
                  {t("onboarding.edcInformation.fields.edcType.options.soundboxNewlandVb90s")}
                </SelectItem>
                <SelectItem value="soundbox-newland-vb80p">
                  {t("onboarding.edcInformation.fields.edcType.options.soundboxNewlandVb80p")}
                </SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="edcType" value={edcType} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="edcCount">
              {t("onboarding.edcInformation.fields.edcCount.label")}
            </label>
            <input
              id="edcCount"
              name="edcCount"
              type="number"
              min="1"
              value={edcCount}
              onChange={(event) => setEdcCount(event.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
              placeholder={t("onboarding.edcInformation.fields.edcCount.placeholder")}
            />
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">
            {t("onboarding.edcInformation.shippingAddress.title")}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {t("onboarding.edcInformation.shippingAddress.subtitle")}
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700" htmlFor="streetName">
                {t("onboarding.edcInformation.shippingAddress.streetName.label")}
              </label>
              <input
                id="streetName"
                name="streetName"
                type="text"
                value={streetName}
                onChange={(event) => setStreetName(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.streetName.placeholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="rt">
                {t("onboarding.edcInformation.shippingAddress.rt.label")}
              </label>
              <input
                id="rt"
                name="rt"
                type="text"
                value={rt}
                onChange={(event) => setRt(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.rt.placeholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="rw">
                {t("onboarding.edcInformation.shippingAddress.rw.label")}
              </label>
              <input
                id="rw"
                name="rw"
                type="text"
                value={rw}
                onChange={(event) => setRw(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.rw.placeholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="province">
                {t("onboarding.edcInformation.shippingAddress.province.label")}
              </label>
              <input
                id="province"
                name="province"
                type="text"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.province.placeholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="city">
                {t("onboarding.edcInformation.shippingAddress.city.label")}
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.city.placeholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="district">
                {t("onboarding.edcInformation.shippingAddress.district.label")}
              </label>
              <input
                id="district"
                name="district"
                type="text"
                value={district}
                onChange={(event) => setDistrict(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.district.placeholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="subDistrict">
                {t("onboarding.edcInformation.shippingAddress.subDistrict.label")}
              </label>
              <input
                id="subDistrict"
                name="subDistrict"
                type="text"
                value={subDistrict}
                onChange={(event) => setSubDistrict(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.subDistrict.placeholder")}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700" htmlFor="postalCode">
                {t("onboarding.edcInformation.shippingAddress.postalCode.label")}
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={postalCode}
                onChange={(event) => setPostalCode(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400"
                placeholder={t("onboarding.edcInformation.shippingAddress.postalCode.placeholder")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
