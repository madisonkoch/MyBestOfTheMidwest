USE `xkllsej1hmyxpxce`;

DROP TABLE IF EXISTS BestOfTheMidwest_Votes;

CREATE TABLE BestOfTheMidwest_Votes(
  state VARCHAR(2) PRIMARY KEY,
  fullname VARCHAR(20) NOT NULL,
  votes INT NOT NULL
);

INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('ia','Iowa',0);

INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('il','Illinois',0);        


INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('in','Indiana',0);        
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('oh','Ohio',0);
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('ks','Kansas',0);
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('mo','Missouri',0);
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('mn','Minnesota',0);
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('wi','Wisconsin',0);
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('sd','South Dakota',0);
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('nd','North Dakota',0);

INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('mi','Michigan',0);
        
INSERT INTO BestOfTheMidwest_Votes (state,fullname,votes)
		VALUES ('ne','Nebraska',0);
