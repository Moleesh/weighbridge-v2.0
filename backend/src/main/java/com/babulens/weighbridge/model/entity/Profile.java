package com.babulens.weighbridge.model.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Profile {
	@Id
	private String profileName;
	private boolean myPrimary = false;

	public Profile() {
	}

	public Profile(String profileName) {
		this.profileName = profileName;
	}

	public String getProfileName() {
		return profileName;
	}

	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}

	public boolean isMyPrimary() {
		return myPrimary;
	}

	public void setMyPrimary(boolean myPrimary) {
		this.myPrimary = myPrimary;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Profile profile = (Profile) o;
		return Objects.equals(profileName, profile.profileName);
	}

	@Override
	public int hashCode() {
		return Objects.hash(profileName);
	}
}
