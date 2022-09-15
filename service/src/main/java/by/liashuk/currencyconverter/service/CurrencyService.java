package by.liashuk.currencyconverter.service;

import by.liashuk.currencyconverter.model.CurrencyRateEntity;

import java.util.List;

public interface CurrencyService {

    Float getRate(CurrencyRateEntity currencyRateEntity);

    List<String> getCurrencies();
}
