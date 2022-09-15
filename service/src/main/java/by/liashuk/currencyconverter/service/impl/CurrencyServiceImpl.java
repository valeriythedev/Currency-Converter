package by.liashuk.currencyconverter.service.impl;

import by.liashuk.currencyconverter.model.CurrencyRateEntity;
import by.liashuk.currencyconverter.service.CurrencyService;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class CurrencyServiceImpl implements CurrencyService {

    private final String apiKey;

    private final RestTemplate restTemplate;

    @Autowired
    public CurrencyServiceImpl(@Value("${forex.apiKey}") String apiKey) {
        this.apiKey = apiKey;
        this.restTemplate = new RestTemplate();
    }

    @Override
    public Float getRate(CurrencyRateEntity currencyRateEntity) {
        log.info("Executing getRate() in CurrencyServiceImpl class, currencyRate: {}", currencyRateEntity);
        return new JSONObject(Objects.requireNonNull(restTemplate.getForEntity("https://api.fastforex.io/convert?" +
                "from=" + currencyRateEntity.getFrom() +
                "&to=" + currencyRateEntity.getTo() +
                "&amount=" + currencyRateEntity.getAmount() +
                "&api_key=" + apiKey, String.class)
                .getBody())).getJSONObject("result")
                .getFloat(currencyRateEntity.getTo());
    }

    @Override
    public List<String> getCurrencies() {
        log.info("Executing getAllCurrencies() in CurrencyServiceImpl class");
        return new ArrayList<>(new JSONObject(
                Objects.requireNonNull(restTemplate.getForEntity("https://api.fastforex.io/currencies?api_key=" + apiKey, String.class).getBody()))
                .getJSONObject("currencies")
                .keySet()
                .stream()
                .sorted()
                .toList());
    }
}