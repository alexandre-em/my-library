package com.daar.mylibrary.config.security;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Value("my-library")
    private String audience;

    @Value("https://dev-mhw-6lg5.us.auth0.com/")
    private String issuer;

    @Bean
    JwtDecoder jwtDecoder() {
        NimbusJwtDecoder jwtDecoder = (NimbusJwtDecoder)
                JwtDecoders.fromOidcIssuerLocation(issuer);

        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audience);
        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(issuer);
        OAuth2TokenValidator<Jwt> withAudience = new DelegatingOAuth2TokenValidator<>(withIssuer, audienceValidator);

        jwtDecoder.setJwtValidator(withAudience);

        return jwtDecoder;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer
                .forRS256(audience, issuer)
                .configure(http)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/v1/books").hasAuthority("PERMISSION_read:books")
                .antMatchers(HttpMethod.GET, "/api/v1/books/index").hasAuthority("PERMISSION_read:books")
                .antMatchers(HttpMethod.GET, "/api/v1/authors").hasAuthority("PERMISSION_read:authors")
                .antMatchers(HttpMethod.POST, "/api/v1/books/protected").hasAuthority("PERMISSION_create:books")
                .antMatchers(HttpMethod.POST, "/api/v1/authors/protected").hasAuthority("PERMISSION_create:authors")
                .antMatchers(HttpMethod.PATCH, "/api/v1/books/protected/{id}").hasAuthority("PERMISSION_update:books")
                .antMatchers(HttpMethod.PUT, "/api/v1/authors/protected/{id}").hasAuthority("PERMISSION_update:authors")
                .antMatchers(HttpMethod.PUT, "/api/v1/books/protected/{id}/image").hasAuthority("PERMISSION_update:books")
                .antMatchers(HttpMethod.PATCH, "/api/v1/authors/protected/{id}/books").hasAuthority("PERMISSION_update:authors")
                .antMatchers(HttpMethod.GET, "/api/v1/books/protected/{id}/content").hasAuthority("PERMISSION_read:books")
                .antMatchers(HttpMethod.PATCH, "/api/v1/books/protected/{id}/content").hasAuthority("PERMISSION_update:books")
                .antMatchers(HttpMethod.GET, "/api/v1/user/{id}").hasAuthority("PERMISSION_read:users")
                .antMatchers(HttpMethod.GET, "/api/v1/user/{id}/books").hasAuthority("PERMISSION_read:users")
                .antMatchers(HttpMethod.DELETE, "/api/v1/user/{id}").hasAuthority("PERMISSION_delete:users")
                .antMatchers(HttpMethod.PATCH, "/api/v1/user/{id}/read/{book_id}").hasAuthority("PERMISSION_update:users")
                .antMatchers(HttpMethod.PATCH, "/api/v1/user/{id}/keywords").hasAuthority("PERMISSION_update:users")
                .antMatchers(HttpMethod.DELETE, "/api/v1/books/protected/{id}").hasAuthority("PERMISSION_delete:books");
    }
}
