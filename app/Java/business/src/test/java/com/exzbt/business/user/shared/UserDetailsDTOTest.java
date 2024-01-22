package com.exzbt.business.user.shared;

import com.exzbt.transaction.appuser.api.UserRole;
import com.exzbt.transaction.appuser.impl.AppUser;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.assertEquals;

@RunWith(MockitoJUnitRunner.class)
public class UserDetailsDTOTest {
    private final UserDetailsDTO underTest = new UserDetailsDTO();

    @Test
    public void convertDTO_whenAppUserIsValid_thenReturnUserDetailsDTO() {
        AppUser user = new AppUser("1L", "firstName", 
                "lastName", "username", "email", "password", UserRole.HIRING);

        UserDetailsDTO expected = new UserDetailsDTO("1L", "firstName",
                "lastName", "email", "username", "HIRING");

        UserDetailsDTO actual = underTest.convertDTO(user);
        assertEquals(expected, actual);
    }
}
