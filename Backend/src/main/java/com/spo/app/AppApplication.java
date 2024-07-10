package com.spo.app;

import com.spo.app.dao.TestRepo;
import com.spo.app.entity.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppApplication implements CommandLineRunner {

	private  final TestRepo testRepo;

	@Autowired
	public  AppApplication(TestRepo testRepo){
		this.testRepo= testRepo;
	}


	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(testRepo.findAll().isEmpty()){
			testRepo.save(new Test("1","nour"));
			testRepo.save(new Test("2","dhia"));
			testRepo.save(new Test("3","khalil"));
		}
		for (Test test: testRepo.findAll()){
			System.out.println(test);
		}
	}
}
