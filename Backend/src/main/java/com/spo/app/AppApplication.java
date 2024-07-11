package com.spo.app;

import com.spo.app.dao.SessionRepository;
import com.spo.app.dao.TestRepo;
import com.spo.app.entity.Session;
import com.spo.app.entity.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppApplication implements CommandLineRunner {


	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

	}
}
	/*@Autowired
	public  AppApplication(TestRepo testRepo, SessionRepository sessionRepository){
		this.testRepo= testRepo;
		this.sessionRepository = sessionRepository;
	}
	private  final TestRepo testRepo;
	private  final SessionRepository sessionRepository;




	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}

	/*@Override
	public void run(String... args) throws Exception {
		//sessionRepository.save((new Session("1","02/12/2024","28/12/2005")));
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
*/