package com.babulens.weighbridge.service;

import java.util.List;

public interface ProfileService {

    String getMyPrimaryProfile();

    void setMyPrimaryProfile(String profile);

    List<String> getAllProfiles();

    List<String> addUpdateProfile(String profile);

}
