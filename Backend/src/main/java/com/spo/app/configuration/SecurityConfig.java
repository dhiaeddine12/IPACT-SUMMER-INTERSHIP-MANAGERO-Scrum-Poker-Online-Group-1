package com.spo.app.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors() // Configurer CORS si nécessaire
                .and()
                .csrf().disable() // Désactiver CSRF si non nécessaire
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/ws/**").permitAll() // Permettre l'accès libre aux WebSockets
                                .anyRequest().permitAll() // Permettre l'accès libre à toutes les autres requêtes
                );

        return http.build();
    }
}
