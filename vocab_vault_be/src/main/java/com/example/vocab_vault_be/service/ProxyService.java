package com.example.vocab_vault_be.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ProxyService {
    private final String cookieQuizlet = "qlts=1_iqv8Fpj7t.P6NglG86tIF7PdG9PM5RokJzenkSj1gIxeDHFLRk9BRu8yo-e9lLz8v8THhzn9lNnYnA; qltj=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzM4NCJ9.eyJ2cmYiOjAsInN1YiI6IjI0NjgxNDA2MCIsInNpcCI6IjE3MS4yNDUuMjQ0LjEyOSIsImlzcyI6InF1aXpsZXQuY29tIiwiZW0iOiIyMWgxMTIwMDMzQHV0LmVkdS52biIsImN0cyI6MTYzNjQ0NjM3MiwiYXVkIjoidjMiLCJhY2MiOjF9.ilGu63GyposRgpQDrp-5Kq5p9eZ0mbaHxbpJ8uUqJy2GVQR04deCj8cMKeDSWJou; qi5=1wvuo1ilvr50w%3Apw758efxtihdU8qIrlqe; fs=sptjoo; _pxhd=4fbdc234a7e7da292e34177e9137c20be255a4d334bb7f57e0ab10582d688489:e76c2608-d74e-11ef-9da5-9cc5f6460ec5; __cf_bm=Dcb8j0WxIQLKgvvGspO1kzbypj3AuFwwfpA9WakIQR4-1737391936-1.0.1.1-DwvXjf9Hy.SAGIk.CtxwehBUBMEND4x3jZ.8JG1MDo4VU9aBPuCFa5N_hzvl7XUMqkK.vbRNtH6g_6lfeF8hSw; _cfuvid=vhG4FMFH9HAWHjUSmBTHagy.6uSyyUI4tj6v4CLhQfE-1737391936214-0.0.1.1-604800000; cf_clearance=WAkSV8FHrYQHdkzf8LcwKtE8dDUHg3NUFOO_NylPUTc-1737391936-1.2.1.1-3_kLKR0_qXjkq7ykVXVq_xGCKVxQKAvRc6fquK0iOqdxyizl87.AxxzAj3F64rofvT99h5C33BrKRMzTJ5QYDSsiqzP8kaiqs9WJB9XsYnhcGbfNuijYmZxuyr_QyeNgxg8FWHRhPYx6QLvIFy0ITw08GzRx_iEFgtrVl1.KylssFycxtm7Cra5gsunkUvRwz0L99DU9p6VDrWMaFgSxewscfURKHA.CrtpXTQ91yVPavOLQ5Pss0ca4hXYxI0d5Zhbn2eZpFU4DXURWe19nkUlH9g_lHglkAfBVxLCeo8I; pxcts=e84913e3-d74e-11ef-9a89-6d0ace019852; _pxvid=e76c2608-d74e-11ef-9da5-9cc5f6460ec5; _px3=7f045f13de36eac9617d51e7d0c1a8998c0c26e1823e4f3287617e7747bcd24a:TIVhArhIppdduikGnZnGoWjjm9Q8SoCJuhBK6oYkXXpd9voZHKMxjGH/HOyN4SlyeQJFDbezK3v8JnWJXv+g0Q==:1000:j6vUEBzYMEHMba5CDFxJhQCldgoArbh8YbsYwHz04ecIfTTYif5DE1KdLEmTnVS6NR1QlUK8JO5g0Gdl1E45hKWBa1deZW6yqpBTOCrwgIAvAs7UM5yP78Is/2PUwUlSPi+RpRGdKbeCp6lFx3vDkLzZE+BuD0+FP3SIkdutauvPu0ZSOJwQIg5N/qC/C3bF1DTx6fLRcIRuDuFCIA6eREUaQFbjhXFwkIjx+afGXwg=; _pxde=40af9ff536460d2e71e6393e0fb6772fd898fe6f58bb33a76c1b260a6bf2f540:eyJ0aW1lc3RhbXAiOjE3MzczOTE5NTIwMDZ9; qtkn=PGdrnrayj44Tqac9PBUMKD; app_session_id=6d3cfb8d-5b43-45bb-afdd-da76bcd0be6c; days_since_last_visit=8; ab.storage.deviceId.6f8c2b67-8bd5-42f6-9c5f-571d9701f693=%7B%22g%22%3A%226f44bf32-15f8-4fd1-1b9d-ccc2de6b27a0%22%2C%22c%22%3A1649231286462%2C%22l%22%3A1737391954230%7D; ab.storage.userId.6f8c2b67-8bd5-42f6-9c5f-571d9701f693=%7B%22g%22%3A%22246814060%22%2C%22c%22%3A1686907118381%2C%22l%22%3A1737391954230%7D; _sp_ses.424b=*; session_landing_page=Sets%2Fnew; sp=4cfd5b5e-5f26-4e7b-83ac-15d92f930f43; create_set_upsell_modal=true; create_set_num_show_upsell_modal=2; ab.storage.sessionId.6f8c2b67-8bd5-42f6-9c5f-571d9701f693=%7B%22g%22%3A%22194fa711-4699-a91f-0d9e-eea49bca6ba1%22%2C%22e%22%3A1737393809833%2C%22c%22%3A1737391954229%2C%22l%22%3A1737392009833%7D; _sp_id.424b=40096d24-615d-49b5-a7c1-54dce9fb65f1.1704243461.14.1737392010.1736689040.2e06d997-a965-425f-8d41-4382887d9fa7.0e19eb0f-1f8c-4946-a754-85741adf2c96.66fb4974-d148-403b-a84f-6e2454d6b489.1737391954243.7";
    public JsonNode fetchSuggestionsEn(String prefix) {
        return WebClient.builder()
                .baseUrl("https://quizlet.com")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/webapi/3.2/suggestions/word")
                        .queryParam("clientId", "-9066731397123319088")
                        .queryParam("limit", 3)
                        .queryParam("defLang", "vi")
                        .queryParam("localTermId", -1)
                        .queryParam("prefix", prefix)
                        .queryParam("wordLang", "en")
                        .build())
                .header("Cookie", cookieQuizlet)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }

    public JsonNode fetchSuggestionsVi(String word) {
        return WebClient.builder()
                .baseUrl("https://quizlet.com")
                .build()
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/webapi/3.2/suggestions/definition")
                        .queryParam("clientId", "-9066731397123319088")
                        .queryParam("limit", 3)
                        .queryParam("word", word)
                        .queryParam("defLang", "vi")
                        .queryParam("localTermId", -1)
                        .queryParam("prefix", "")
                        .build())
                .header("Cookie", cookieQuizlet)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }
}
