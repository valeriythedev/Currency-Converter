package by.liashuk.currencyconverter.controller;

import by.liashuk.currencyconverter.model.CurrencyRateEntity;
import by.liashuk.currencyconverter.service.CurrencyService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/currency")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:8080", "http://localhost:3000/"})
public class CurrencyController {

    private final CurrencyService currencyService;

    @GetMapping("/convert")
    public Float convertCurrency(@RequestParam("from") String from,
                                 @RequestParam("to") String to,
                                 @RequestParam("amount") Float amount) {
        return currencyService.getRate(new CurrencyRateEntity(from, to, amount));
    }

    @GetMapping("/")
    public List<String> getCurrencies() {
        return currencyService.getCurrencies();
    }
}