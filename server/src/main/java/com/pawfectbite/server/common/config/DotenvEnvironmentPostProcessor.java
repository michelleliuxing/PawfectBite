package com.pawfectbite.server.common.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.env.EnvironmentPostProcessor;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

/**
 * Loads key-value pairs from a {@code .env} file in the working directory
 * and exposes them as a Spring property source. This allows
 * {@code ${VARIABLE}} placeholders in application.properties to resolve
 * from the .env file without exporting shell variables.
 *
 * The .env file is optional — if absent, this processor is a no-op.
 */
public class DotenvEnvironmentPostProcessor implements EnvironmentPostProcessor {

    @Override
    public void postProcessEnvironment(ConfigurableEnvironment environment, SpringApplication application) {
        Path dotenvPath = Path.of(".env");
        if (!Files.exists(dotenvPath)) {
            return;
        }

        try {
            Map<String, Object> envVars = new HashMap<>();
            for (String line : Files.readAllLines(dotenvPath)) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }
                int eqIndex = line.indexOf('=');
                if (eqIndex <= 0) {
                    continue;
                }
                String key = line.substring(0, eqIndex).trim();
                String value = line.substring(eqIndex + 1).trim();
                if (value.length() >= 2
                        && ((value.startsWith("\"") && value.endsWith("\""))
                        || (value.startsWith("'") && value.endsWith("'")))) {
                    value = value.substring(1, value.length() - 1);
                }
                envVars.put(key, value);
            }

            if (!envVars.isEmpty()) {
                environment.getPropertySources()
                        .addLast(new MapPropertySource("dotenv", envVars));
            }
        } catch (IOException ignored) {
            // .env is optional — silently skip if unreadable
        }
    }
}
