package com.babulens.weighbridge.service;


import com.babulens.weighbridge.model.entity.Material;
import com.babulens.weighbridge.model.entity.Profile;

import java.util.List;

public interface ProfileService {

	List<Profile> getAllProfile();

	Material addUpdateProfile(Profile profile);

}
