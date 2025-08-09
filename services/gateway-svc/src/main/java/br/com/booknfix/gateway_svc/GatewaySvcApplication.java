package br.com.booknfix.gateway_svc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewaySvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewaySvcApplication.class, args);
	}

}
