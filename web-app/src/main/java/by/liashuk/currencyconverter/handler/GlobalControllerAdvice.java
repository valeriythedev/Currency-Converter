package by.liashuk.currencyconverter.handler;

import by.liashuk.currencyconverter.model.ErrorEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;

@RestControllerAdvice
@Slf4j
public class GlobalControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ErrorEntity handleValidationException(MissingServletRequestParameterException exception) {
        log.error("Exception occurred handleValidationException() in GlobalControllerAdvice : {}",exception.getMessage());
        return new ErrorEntity(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), HttpStatus.BAD_REQUEST.toString(), LocalDateTime.now());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpClientErrorException.class)
    public ErrorEntity handleHttpClientErrorException(HttpClientErrorException exception) {
        log.error("Exception occurred handleHttpClientErrorException() in GlobalControllerAdvice : {}",exception.getMessage());
        return new ErrorEntity(HttpStatus.BAD_REQUEST.value(), exception.getMessage(), HttpStatus.BAD_REQUEST.toString(), LocalDateTime.now());
    }

}
