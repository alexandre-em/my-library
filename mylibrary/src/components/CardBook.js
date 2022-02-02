import React, { useEffect, useState } from 'react';
import { ScrollView, Dimensions  } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Dialog, Portal } from 'react-native-paper';
import noImage from 'assets/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg';
import { getId } from 'services';
import jwt_decode from "jwt-decode";
import { useSelector } from 'react-redux';
import { bookRead } from 'services/users';

export default function CardBook(props) {
    const { title, author, image, id } = props.item
    const auth = useSelector((state) => state.auth);

    const windowHeight = Dimensions.get('window').height;
    const windowWidth = Dimensions.get('window').width;

    const [visible, setVisible] = useState(false);

    const manageDialog = () => setVisible(prevState => !prevState);

    const [book,setBook] = useState({})

    const affichageDonnees = (id) => {
        const res = getId(id)
        .then((res) => {
          //console.log(res);
          setBook(res.data);
        })
        .catch((err) => {
          //console.log(err);
        });
    }

    const openDialog = (id) =>{
        affichageDonnees(id);
        manageDialog();
        const token = jwt_decode(auth.accessToken);
        bookRead(token.sub,id, auth.accessToken).then((res)=>{
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        });

    }

    return (
        <>
        <Card style={{width:'200px', margin:10}}>
            <Card.Cover source={image?image:noImage} />
            <Card.Title style={{textOverflow: 'ellipsis',overflow: 'hidden' }}title={title} subtitle={author} />
            <Card.Actions>
            <Button onPress={() => openDialog(id)}>View more</Button>
            
            </Card.Actions>
        </Card>
        <Portal>
          <Dialog visible={visible} onDismiss={manageDialog} style={{height:windowHeight}}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.ScrollArea>
            <ScrollView><Paragraph>The Project Gutenberg EBook of A Practical Physiology, by Albert F. Blaisdell

This eBook is for the use of anyone anywhere at no cost and with
almost no restrictions whatsoever.  You may copy it, give it away or
re-use it under the terms of the Project Gutenberg License included
with this eBook or online at www.gutenberg.org


Title: A Practical Physiology

Author: Albert F. Blaisdell

Release Date: December 14, 2003 [EBook #10453]

Language: English

Character set encoding: UTF-8

*** START OF THIS PROJECT GUTENBERG EBOOK A PRACTICAL PHYSIOLOGY ***




Produced by Distributed Proofreaders





[Transcriber's Note: Figures 162-167 have been renumbered. In the
original, Figure 162 was labeled as 161; 163 as 162; etc.]




A Practical Physiology

A Text-Book for Higher Schools

By

Albert F. Blaisdell, M.D.

Author of "Child's Book of Health," "How to Keep Well,"
"Our Bodies and How We Live," Etc., Etc.




Preface.



The author has aimed to prepare a text-book on human physiology for use in
higher schools. The design of the book is to furnish a practical manual of
the more important facts and principles of physiology and hygiene, which
will be adapted to the needs of students in high schools, normal schools,
and academies.

Teachers know, and students soon learn to recognize the fact, that it is
impossible to obtain a clear understanding of the functions of the various
parts of the body without first mastering a few elementary facts about
their structure. The course adopted, therefore, in this book, is to devote
a certain amount of space to the anatomy of the several organs before
describing their functions.

A mere knowledge of the facts which can be gained in secondary schools,
concerning the anatomy and physiology of the human body, is of little real
value or interest in itself. Such facts are important and of practical
worth to young students only so far as to enable them to understand the
relation of these facts to the great laws of health and to apply them to
daily living. Hence, it has been the earnest effort of the author in this
book, as in his other physiologies for schools, to lay special emphasis
upon such points as bear upon personal health.

Physiology cannot be learned as it should be by mere book study. The
result will be meagre in comparison with the capabilities of the subject.
The study of the text should always be supplemented by a series of
practical experiments. Actual observations and actual experiments are as
necessary to illuminate the text and to illustrate important principles in
physiology as they are in botany, chemistry, or physics. Hence, as
supplementary to the text proper, and throughout the several chapters, a
series of carefully arranged and practical experiments has been added. For
the most part, they are simple and can be performed with inexpensive and
easily obtained apparatus. They are so arranged that some may be omitted
and others added as circumstances may allow.

If it becomes necessary to shorten the course in physiology, the various
sections printed in smaller type may be omitted or used for home study.

The laws of most of the states now require in our public schools the study
of the effects of alcoholic drinks, tobacco, and other narcotics upon the
bodily life. This book will be found to comply fully with all such laws.

The author has aimed to embody in simple and concise language the latest
and most trustworthy information which can be obtained from the standard
authorities on modern physiology, in regard to the several topics.

In the preparation of this text-book the author has had the editorial help
of his esteemed friend, Dr. J. E. Sanborn, of Melrose, Mass., and is also
indebted to the courtesy of Thomas E. Major, of Boston, for assistance in
revising the proofs.

Albert F. Blaisdell.

Boston, August, 1897.




Contents.



Chapter I.    Introduction
Chapter II.   The Bones
Chapter III.  The Muscles
Chapter IV.   Physical Exercise
Chapter V.    Food and Drink
Chapter VI.   Digestion
Chapter VII.  The Blood and Its Circulation
Chapter VIII. Respiration
Chapter IX.   The Skin and the Kidneys
Chapter X.    The Nervous System
Chapter XI.   The Special Sense
Chapter XII.  The Throat and the Voice
Chapter XIII. Accidents and Emergencies
Chapter XIV.  In Sickness and in Health
  Care of the Sick-Room; Poisons and their Antidotes; Bacteria;
  Disinfectants; Management of Contagious Diseases.
Chapter XV. Experimental Work in Physiology
  Practical Experiments; Use of the Microscope; Additional Experiments;
  Surface Anatomy and Landmarks.

Glossary

Index




Chapter I.

Introduction.



1. The Study of Physiology. We are now to take up a new study, and in
a field quite different from any we have thus far entered. Of all our
other studies,--mathematics, physics, history, language,--not one comes
home to us with such peculiar interest as does physiology, because
this is the study of ourselves.

Every thoughtful young person must have asked himself a hundred questions
about the problems of human life: how it can be that the few articles of
our daily food--milk, bread, meats, and similar things--build up our
complex bodies, and by what strange magic they are transformed into hair,
skin, teeth, bones, muscles, and blood.

How is it that we can lift these curtains of our eyes and behold all the
wonders of the world around us, then drop the lids, and though at noonday,
are instantly in total darkness? How does the minute structure of the ear
report to us with equal accuracy the thunder of the tempest, and the hum
of the passing bee? Why is breathing so essential to our life, and why
cannot we stop breathing when we try? Where within us, and how, burns the
mysterious fire whose subtle heat warms us from the first breath of
infancy till the last hour of life?

These and scores of similar questions it is the province of this deeply
interesting study of physiology to answer.

2. What Physiology should Teach us. The study of physiology is not
only interesting, but it is also extremely useful. Every reasonable person
should not only wish to acquire the knowledge how best to protect and
preserve his body, but should feel a certain profound respect for an
organism so wonderful and so perfect as his physical frame. For our bodies
are indeed not ourselves, but the frames that contain us,--the ships in
which we, the real selves, are borne over the sea of life. He must be
indeed a poor navigator who is not zealous to adorn and strengthen his
ship, that it may escape the rocks of disease and premature decay, and
that the voyage of his life may be long, pleasant, and successful.

But above these thoughts there rises another,--that in studying physiology
we are tracing the myriad lines of marvelous ingenuity and forethought, as
they appear at every glimpse of the work of the Divine Builder. However
closely we study our bodily structure, we are, at our best, but imperfect
observers of the handiwork of Him who made us as we are.

3. Distinctive Characters of Living Bodies. Even a very meagre
knowledge of the structure and action of our bodies is enough to reveal
the following distinctive characters: our bodies are continually
breathing, that is, they take in oxygen from the surrounding air; they
take in certain substances known as food, similar to those composing the
body, which are capable through a process called oxidation, or through
other chemical changes, of setting free a certain amount of energy.

Again, our bodies are continually making heat and giving it out to
surrounding objects, the production and the loss of heat being so adjusted
that the whole body is warm, that is, of a temperature higher than that of
surrounding objects. Our bodies, also, move themselves, either one part
on another, or the whole body from place to place. The motive power is not
from the outside world, but the energy of their movements exists in the
bodies themselves, influenced by changes in their surroundings. Finally,
our bodies are continually getting rid of so-called waste matters, which
may be considered products of the oxidation of the material used as food,
or of the substances which make up the organism.

4. The Main Problems of Physiology briefly Stated. We shall learn in
a subsequent chapter that the living body is continually losing energy,
but by means of food is continually restoring its substance and
replenishing its stock of energy. A great deal of energy thus stored up is
utilized as mechanical work, the result of physical movements. We shall
learn later on that much of the energy which at last leaves the body as
heat, exists for a time within the organism in other forms than heat,
though eventually transformed into heat. Even a slight change in the
surroundings of the living body may rapidly, profoundly, and in special
ways affect not only the amount, but the kind of energy set free. Thus the
mere touch of a hair may lead to such a discharge of energy, that a body
previously at rest may be suddenly thrown into violent convulsions. This
is especially true in the case of tetanus, or lockjaw.

The main problem we have to solve in the succeeding pages is to ascertain
how it is that our bodies can renew their substance and replenish the
energy which they are continually losing, and can, according to the nature
of their surroundings, vary not only the amount, but the kind of energy
which they set free.

5. Technical Terms Defined. All living organisms are studied usually
from two points of view: first, as to their form and structure; second, as
to the processes which go on within them. The science which treats of all
living organisms is called biology. It has naturally two
divisions,--morphology, which treats of the form and structure of
living beings, and physiology, which investigates their functions, or
the special work done in their vital processes.

The word anatomy, however, is usually employed instead of morphology.
It is derived from two Greek words, and means the science of dissection.
Human anatomy then deals with the form and structure of the human
body, and describes how the different parts and organs are arranged, as
revealed by observation, by dissection, and by the microscope.

Histology is that part of anatomy which treats of the minute
structure of any part of the body, as shown by the microscope.

Human physiology describes the various processes that go on in the
human body in health. It treats of the work done by the various parts of
the body, and of the results of the harmonious action of the several
organs. Broadly speaking, physiology is the science which treats of
functions. By the word function is meant the special work which an
organ has to do. An organ is a part of the body which does a special
work. Thus the eye is the organ of sight, the stomach of digestion, and
the lungs of breathing.

It is plain that we cannot understand the physiology of our bodies without
a knowledge of their anatomy. An engineer could not understand the working
of his engine unless well acquainted with all its parts, and the manner in
which they were fitted together. So, if we are to understand the
principles of elementary physiology, we must master the main anatomical
facts concerning the organs of the body before considering their special
functions.

As a branch of study in our schools, physiology aims to make clear certain
laws which are necessary to health, so that by a proper knowledge of them,
and their practical application, we may hope to spend happier and more
useful, because healthier, lives. In brief, the study of hygiene, or
the science of health, in the school curriculum, is usually associated
with that of physiology.[1]

6. Chemical Elements in the Body. All of the various complex
substances found in nature can be reduced by chemical analysis to about 70
elements, which cannot be further divided. By various combinations of
these 70 elements all the substances known to exist in the world of nature
are built up. When the inanimate body, like any other substance, is
submitted to chemical analysis, it is found that the bone, muscle, teeth,
blood, etc., may be reduced to a few chemical elements.

In fact, the human body is built up with 13 of the 70 elements, namely:
oxygen, hydrogen, nitrogen, chlorine, fluorine, carbon, phosphorus,
sulphur, calcium, potassium, sodium, magnesium, and iron. Besides
these, a few of the other elements, as silicon, have been found; but they
exist in extremely minute quantities.

The following table gives the proportion in which these various elements
are present:

  Oxygen           62.430 per cent
  Carbon           21.150  "   "
  Hydrogen          9.865  "   "
  Nitrogen          3.100  "   "
  Calcium           1.900  "   "
  Phosphorus        0.946  "   "
  Potassium         0.230  "   "
  Sulphur           0.162  "   "
  Chlorine          0.081  "   "
  Sodium            0.081  "   "
  Magnesium         0.027  "   "
  Iron              0.014  "   "
  Fluorine          0.014  "   "
                    -----
                  100.000

As will be seen from this table, oxygen, hydrogen, and nitrogen, which are
gases in their uncombined form, make up ¾ of the weight of the whole
human body. Carbon, which exists in an impure state in charcoal, forms
more than ⅕ of the weight of the body. Thus carbon and the three gases
named, make up about 96 per cent of the total weight of the body.

7. Chemical Compounds in the Body. We must keep in mind that, with
slight exceptions, none of these 13 elements exist in their elementary
form in the animal economy. They are combined in various proportions, the
results differing widely from the elements of which they consist. Oxygen
and hydrogen unite to form water, and water forms more than ⅔ of the
weight of the whole body. In all the fluids of the body, water acts as a
solvent, and by this means alone the circulation of nutrient material is
possible. All the various processes of secretion and nutrition depend on
the presence of water for their activities.

8. Inorganic Salts. A large number of the elements of the body unite
one with another by chemical affinity and form inorganic salts. Thus
sodium and chlorine unite and form chloride of sodium, or common salt.
This is found in all the tissues and fluids, and is one of the most
important inorganic salts the body contains. It is absolutely necessary
for continued existence. By a combination of phosphorus with sodium,
potassium, calcium, and magnesium, the various phosphates are formed.

The phosphates of lime and soda are the most abundant of the salts of the
body. They form more than half the material of the bones, are found in the
teeth and in other solids and in the fluids of the body. The special place
of iron is in the coloring matter of the blood. Its various salts are
traced in the ash of bones, in muscles, and in many other tissues and
fluids. These compounds, forming salts or mineral matters that exist in
the body, are estimated to amount to about 6 per cent of the entire
weight.

9. Organic Compounds. Besides the inorganic materials, there exists
in the human body a series of compound substances formed of the union of
the elements just described, but which require the agency of living
structures. They are built up from the elements by plants, and are called
organic. Human beings and the lower animals take the organized
materials they require, and build them up in their own bodies into still
more highly organized forms.

The organic compounds found in the body are usually divided into three
great classes:

  1. Proteids, or albuminous substances.
  2. Carbohydrates (starches, sugars, and gums).
  3. Fats.

The extent to which these three great classes of organic materials of the
body exist in the animal and vegetable kingdoms, and are utilized for the
food of man, will be discussed in the chapter on food (Chapter V.). The
Proteids, because they contain the element nitrogen and the others do
not, are frequently called nitrogenous, and the other two are known
as non-nitrogenous substances. The proteids, the type of which is egg
albumen, or the white of egg, are found in muscle and nerve, in glands, in
blood, and in nearly all the fluids of the body. A human body is estimated
to yield on an average about 18 per cent of albuminous substances. In the
succeeding chapters we shall have occasion to refer to various and allied
forms of proteids as they exist in muscle (myosin), coagulated blood
(fibrin), and bones (gelatin).

The Carbohydrates are formed of carbon, hydrogen, and oxygen, the
last two in the proportion to form water. Thus we have animal starch, or
glycogen, stored up in the liver. Sugar, as grape sugar, is also found in
the liver. The body of an average man contains about 10 per cent of
Fats. These are formed of carbon, hydrogen, and oxygen, in which the
latter two are not in the proportion to form water. The fat of the body
consists of a mixture which is liquid at the ordinary temperature.

Now it must not for one moment be supposed that the various chemical
elements, as the proteids, the salts, the fats, etc., exist in the body in
a condition to be easily separated one from another. Thus a piece of
muscle contains all the various organic compounds just mentioned, but they
are combined, and in different cases the amount will vary. Again, fat may
exist in the muscles even though it is not visible to the naked eye, and a
microscope is required to show the minute fat cells.

10. Protoplasm. The ultimate elements of which the body is composed
consist of "masses of living matter," microscopic in size, of a material
commonly called protoplasm.[2] In its simplest form protoplasm
appears to be a homogeneous, structureless material, somewhat resembling
the raw white of an egg. It is a mixture of several chemical substances
and differs in appearance and composition in different parts of the body.

Protoplasm has the power of appropriating nutrient material, of dividing
and subdividing, so as to form new masses like itself. When not built into
a tissue, it has the power of changing its shape and of moving from place
to place, by means of the delicate processes which it puts forth. Now,
while there are found in the lowest realm of animal life, organisms like
the amœba of stagnant pools, consisting of nothing more than minute
masses of protoplasm, there are others like them which possess a small
central body called a nucleus. This is known as nucleated protoplasm.

[Illustration: Fig. 1.--Diagram of a Cell.

  A, nucleus;
  B, nucleolus;
  C, protoplasm. (Highly magnified)
]

11. Cells. When we carry back the analysis of an organized body as
far as we can, we find every part of it made up of masses of nucleated
protoplasm of various sizes and shapes. In all essential features these
masses conform to the type of protoplasmic matter just described. Such
bodies are called cells. In many cells the nucleus is finely granular or
reticulated in appearance, and on the threads of the meshwork may be one
or more enlargements, called nucleoli. In some cases the protoplasm at the
circumference is so modified as to give the appearance of a limiting
membrane called the cell wall. In brief, then, a cell is a mass of
nucleated protoplasm; the nucleus may have a nucleolus, and the cell
may be limited by a cell wall. Every tissue of the human body is formed
through the agency of protoplasmic cells, although in most cases the
changes they undergo are so great that little evidence remains of their
existence.

There are some organisms lower down in the scale, whose whole activity is
confined within the narrow limits of a single cell. Thus, the amœba
begins its life as a cell split off from its parent. This divides in its
turn, and each half is a complete amœba. When we come a little higher
than the amœba, we find organisms which consist of several cells, and a
specialization of function begins to appear. As we ascend in the animal
scale, specialization of structure and of function is found continually
advancing, and the various kinds of cells are grouped together into
colonies or organs.

12. Cells and the Human Organism. If the body be studied in its
development, it is found to originate from a single mass of nucleated
protoplasm, a single cell with a nucleus and nucleolus. From this
original cell, by growth and development, the body, with all its various
tissues, is built up. Many fully formed organs, like the liver, consist
chiefly of cells. Again, the cells are modified to form fibers, such as
tendon, muscle, and nerve. Later on, we shall see the white blood
corpuscles exhibit all the characters of the amœba (Fig. 2). Even such
dense structures as bone, cartilage, and the teeth are formed from cells.

[Illustration: Fig. 2.--Amœboid Movement of a Human White Blood
Corpuscle. (Showing various phases of movement.)]

In short, cells may be regarded as the histological units of animal
structures; by the combination, association, and modification of these
the body is built up. Of the real nature of the changes going on within
the living protoplasm, the process of building up lifeless material into
living structures, and the process of breaking down by which waste is
produced, we know absolutely nothing. Could we learn that, perhaps we
should know the secret of life.

13. Kinds of Cells. Cells vary greatly in size, some of the smallest
being only 1/3500 an inch or less in diameter. They also vary greatly in
form, as may be seen in Figs. 3 and 5. The typical cell is usually
_globular_ in form, other shapes being the result of pressure or of
similar modifying influences. The globular, as well as the large, flat
cells, are well shown in a drop of saliva. Then there are the _columnar_
cells, found in various parts of the intestines, in which they are closely
arranged side by side. These cells sometimes have on the free surface
delicate prolongations called cilia. Under the microscope they resemble a
wave, as when the wind blows over a field of grain (Fig. 5). There are
besides cells known as _spindle, stellate, squamous_ or pavement, and
various other names suggested by their shapes. Cells are also described as
to their contents. Thus _fat_ and _pigment_ cells are alluded to in
succeeding sections. Again, they may be described as to their functions or
location or the tissue in which they are found, as _epithelial_ cells,
_blood_ cells (corpuscles, Figs. 2 and 66), _nerve_ cells (Fig. 4), and
_connective-tissue_ cells.

14. Vital Properties of Cells. Each cell has a life of its own. It
manifests its vital properties in that it is born, grows, multiplies,
decays, and at last dies.[3] During its life it assimilates food, works,
rests, and is capable of spontaneous motion and frequently of locomotion.
The cell can secrete and excrete substance, and, in brief, presents nearly
all the phenomena of a human being.

Cells are produced only from cells by a process of self-division,
consisting of a cleavage of the whole cell into parts, each of which
becomes a separate and independent organism. Cells rapidly increase in
size up to a certain definite point which they maintain during adult life.
A most interesting quality of cell life is motion, a beautiful form of
which is found in ciliated epithelium. Cells may move actively and
passively. In the blood the cells are swept along by the current, but the
white corpuscles, seem able to make their way actively through the
tissues, as if guided by some sort of instinct.

[Illustration: Fig. 3.--Various Forms of Cells.

  A, columnar cells found lining various parts of the intestines (called
     _columnar epithelium_);
  B, cells of a fusiform or spindle shape found in the loose tissue under
     the skin and in other parts (called _connective-tissue cells_);
  C, cell having many processes or projections--such are found in
     connective tissue, D, primitive cells composed of protoplasm with
     nucleus, and having no cell wall. All are represented about 400 times
     their real size.
]

Some cells live a brief life of 12 to 24 hours, as is probably the case
with many of the cells lining the alimentary canal; others may live for
years, as do the cells of cartilage and bone. In fact each cell goes
through the same cycle of changes as the whole organism, though doubtless
in a much shorter time. The work of cells is of the most varied kind, and
embraces the formation of every tissue and product,--solid, liquid, or
gaseous. Thus we shall learn that the cells of the liver form bile, those
of the salivary glands and of the glands of the stomach and pancreas form
juices which aid in the digestion of food.

15. The Process of Life. All living structures are subject to
constant decay. Life is a condition of incessant changes, dependent upon
two opposite processes, repair and decay. Thus our bodies are not
composed of exactly the same particles from day to day, or even from one
moment to another, although to all appearance we remain the same
individuals. The change is so gradual, and the renewal of that which is
lost may be so exact, that no difference can be noticed except at long
intervals of time.[4] (See under "Bacteria," Chapter XIV.)

The entire series of chemical changes that take place in the living body,
beginning with assimilation and ending with excretion, is included in one
word, metabolism. The process of building up living material, or the
change by which complex substances (including the living matter itself)
are built up from simpler materials, is called anabolism. The
breaking down of material into simple products, or the changes in which
complex materials (including the living substance) are broken down into
comparatively simple products, is known as katabolism. This reduction
of complex substances to simple, results in the production of animal force
and energy. Thus a complex substance, like a piece of beef-steak, is built
up of a large number of molecules which required the expenditure of force
or energy to store up. Now when this material is reduced by the process of
digestion to simpler bodies with fewer molecules, such as carbon dioxid,
urea, and water, the force stored up in the meat as potential energy
becomes manifest and is used as active life-force known as _kinetic
energy_.

16. Epithelium. Cells are associated and combined in many ways to
form a simple tissue. Such a simple tissue is called an epithelium or
surface-limiting tissue, and the cells are known as epithelial
cells. These are united by a very small amount of a cement substance which
belongs to the proteid class of material. The epithelial cells, from their
shape, are known as squamous, columnar, glandular, or ciliated. Again, the
cells may be arranged in only a single layer, or they may be several
layers deep. In the former case the epithelium is said to be simple; in
the latter, stratified. No blood-vessels pass into these tissues; the
cells derive their nourishment by the imbibition of the plasma of the
blood exuded into the subjacent tissue.

[Illustration: Fig. 4.--Nerve Cells from the Gray Matter of the
Cerebellum. (Magnified 260 diameters.)]

17. Varieties of Epithelium. The squamous or pavement epithelium
consists of very thin, flattened scales, usually with a small nucleus in
the center. When the nucleus has disappeared, they become mere horny
plates, easily detached. Such cells will be described as forming the outer
layer of the skin, the lining of the mouth and the lower part of the
nostrils.

The columnar epithelium consists of pear-shaped or elongated cells,
frequently as a single layer of cells on the surface of a mucous membrane,
as on the lining of the stomach and intestines, and the free surface of
the windpipe and large air-tubes.

The glandular or spheroidal epithelium is composed of round cells or
such as become angular by mutual pressure. This kind forms the lining of
glands such as the liver, pancreas, and the glands of the skin.

The ciliated epithelium is marked by the presence of very fine
hair-like processes called cilia, which develop from the free end of the
cell and exhibit a rapid whip-like movement as long as the cell is alive.
This motion is always in the same direction, and serves to carry away
mucus and even foreign particles in contact with the membrane on which
the cells are placed. This epithelium is especially common in the air
passages, where it serves to keep a free passage for the entrance and exit
of air. In other canals a similar office is filled by this kind of
epithelium.

18. Functions of Epithelial Tissues. The epithelial structures may be
divided, as to their functions, into two main divisions. One is chiefly
protective in character. Thus the layers of epithelium which form the
superficial layer of the skin have little beyond such an office to
discharge. The same is to a certain extent true of the epithelial cells
covering the mucous membrane of the mouth, and those lining the air
passages and air cells of the lungs.

[Illustration: Fig. 5.--Various Kinds of Epithelial Cells

  A, columnar cells of intestine;
  B, polyhedral cells of the conjunctiva;
  C, ciliated conical cells of the trachea;
  D, ciliated cell of frog's mouth;
  E, inverted conical cell of trachea;
  F, squamous cell of the cavity of mouth, seen from its broad surface;
  G, squamous cell, seen edgeways.
]

The second great division of the epithelial tissues consists of those
whose cells are formed of highly active protoplasm, and are busily engaged
in some sort of secretion. Such are the cells of glands,--the cells of the
salivary glands, which secrete the saliva, of the gastric glands, which
secrete the gastric juice, of the intestinal glands, and the cells of the
liver and sweat glands.

19. Connective Tissue. This is the material, made up of fibers and
cells, which serves to unite and bind together the different organs and
tissues. It forms a sort of flexible framework of the body, and so
pervades every portion that if all the other tissues were removed, we
should still have a complete representation of the bodily shape in every
part. In general, the connective tissues proper act as packing,
binding, and supporting structures. This name includes certain tissues
which to all outward appearance vary greatly, but which are properly
grouped together for the following reasons: first, they all act as
supporting structures; second, under certain conditions one may be
substituted for another; third, in some places they merge into each other.

All these tissues consist of a ground-substance, or matrix, cells, and
fibers. The ground-substance is in small amount in connective tissues
proper, and is obscured by a mass of fibers. It is best seen in hyaline
cartilage, where it has a glossy appearance. In bone it is infiltrated
with salts which give bone its hardness, and make it seem so unlike other
tissues. The cells are called connective-tissue corpuscles, cartilage
cells, and bone corpuscles, according to the tissues in which they occur.
The fibers are the white fibrous and the yellow elastic tissues.

The following varieties are usually described:

    I. Connective Tissues Proper:

      1. White Fibrous Tissue.
      2. Yellow Elastic Tissue.
      3. Areolar or Cellular Tissue.
      4. Adipose or Fatty Tissue.
      5. Adenoid or Retiform Tissue.

    II. Cartilage (Gristle):

      1. Hyaline.
      2. White Fibro-cartilage.
      3. Yellow Fibro-cartilage.

    III. Bone and Dentine of Teeth.

20. White Fibrous Tissue. This tissue consists of bundles of very
delicate fibrils bound together by a small amount of cement substance.
Between the fibrils protoplasmic masses (connective-tissue corpuscles)
are found. These fibers may be found so interwoven as to form a sheet, as
in the periosteum of the bone, the fasciæ around muscles, and the capsules
of organs; or they may be aggregated into bundles and form rope-like
bands, as in the ligaments of joints and the tendons of muscles. On
boiling, this tissue yields gelatine. In general, where white fibrous
tissue abounds, structures are held together, and there is flexibility,
but little or no distensibility.

[Illustration: Fig. 6.--White Fibrous Tissue. (Highly magnified.)]

21. Yellow Elastic Tissue. The fibers of yellow elastic tissue
are much stronger and coarser than those of the white. They are yellowish,
tend to curl up at the ends, and are highly elastic. It is these fibers
which give elasticity to the skin and to the coats of the arteries. The
typical form of this tissue occurs in the ligaments which bind the
vertebræ together (Fig. 26), in the true vocal cords, and in certain
ligaments of the larynx. In the skin and fasciæ, the yellow elastic is
found mixed with white fibrous and areolar tissues. It does not yield
gelatine on boiling, and the cells are, if any, few.

[Illustration: Fig. 7.--Yellow Elastic Tissue. (Highly magnified.)]

22. Areolar or Cellular Tissue. This consists of bundles of delicate
fibers interlacing and crossing one another, forming irregular spaces or
meshes. These little spaces, in health, are filled with fluid that has
oozed out of the blood-vessels. The areolar tissue forms a protective
covering for the tissues of delicate and important organs.

23. Adipose or Fatty Tissue. In almost every part of the body the
ordinary areolar tissue contains a variable quantity of adipose or
fatty tissue. Examined by the microscope, the fat cells consist of a
number of minute sacs of exceedingly delicate, structureless membrane
filled with oil. This is liquid in life, but becomes solidified after
death. This tissue is plentiful beneath the skin, in the abdominal cavity,
on the surface of the heart, around the kidneys, in the marrow of bones,
and elsewhere. Fat serves as a soft packing material. Being a poor
conductor, it retains the heat, and furnishes a store rich in carbon and
hydrogen for use in the body.

24. Adenoid or Retiform Tissue. This is a variety of connective
tissue found in the tonsils, spleen, lymphatic glands, and allied
structures. It consists of a very fine network of cells of various sizes.
The tissue combining them is known as adenoid or gland-like tissue.

[Illustration: Fig. 8.--Fibro-Cartilage Fibers. (Showing network
surrounded cartilage cells.)]

25. Cartilage. Cartilage, or gristle, is a tough but highly elastic
substance. Under the microscope cartilage is seen to consist of a
matrix, or base, in which nucleated cells abound, either singly or in
groups. It has sometimes a fine ground-glass appearance, when the
cartilage is spoken of as hyaline. In other cases the matrix is
almost replaced by white fibrous tissue. This is called white
fibro-cartilage, and is found where great strength and a certain
amount of rigidity are required.

Again, there is between the cells a meshwork of yellow elastic fibers, and
this is called yellow fibro-cartilage (Fig. 8). The hyaline cartilage
forms the early state of most of the bones, and is also a permanent
coating for the articular ends of long bones. The white fibro-cartilage is
found in the disks between the bodies of the vertebræ, in the interior of
the knee joint, in the wrist and other joints, filling the cavities of the
bones, in socket joints, and in the grooves for tendons. The yellow
fibro-cartilage forms the expanded part of the ear, the epiglottis, and
other parts of the larynx.

26. General Plan of the Body. To get a clearer idea of the general
plan on which the body is constructed, let us imagine its division into
perfectly equal parts, one the right and the other the left, by a great
knife severing it through the median, or middle line in front, backward
through the spinal column, as a butcher divides an ox or a sheep into
halves for the market. In a section of the body thus planned the skull and
the spine together are shown to have formed a tube, containing the brain
and spinal cord. The other parts of the body form a second tube (ventral)
in front of the spinal or dorsal tube. The upper part of the second tube
begins with the mouth and is formed by the ribs and breastbone. Below the
chest in the abdomen, the walls of this tube would be made up of the soft
parts.

[Illustration: Fig. 9.--Diagrammatic Longitudinal Section of the Trunk and
Head. (Showing the dorsal and the ventral tubes.)

  A, the cranial cavity;
  B, the cavity of the nose;
  C, the mouth;
  D, the alimentary canal represented as a simple straight tube;
  E, the sympathetic nervous system;
  F, heart;
  G, diaphragm;
  H, stomach;
  K, end of spinal portion of cerebro-spinal nervous system.
]

We may say, then, that the body consists of two tubes or cavities,
separated by a bony wall, the dorsal or nervous tube, so called
because it contains the central parts of the nervous system; and the
visceral or ventral tube, as it contains the viscera, or general
organs of the body, as the alimentary canal, the heart, the lungs, the
sympathetic nervous system, and other organs.

The more detailed study of the body may now be begun by a description of
the skeleton or framework which supports the soft parts.



Experiments.


For general directions and explanations and also detailed suggestions for
performing experiments, see Chapter XV.

  Experiment 1. _To examine squamous epithelium._ With an ivory
  paper-knife scrape the back of the tongue or the inside of the lips or
  cheek; place the substance thus obtained upon a glass slide; cover it
  with a thin cover-glass, and if necessary add a drop of water. Examine
  with the microscope, and the irregularly formed epithelial cells will be
  seen.

  Experiment 2. _To examine ciliated epithelium._ Open a frog's
  mouth, and with the back of a knife blade gently scrape a little of the
  membrane from the roof of the mouth. Transfer to a glass slide, add a
  drop of salt solution, and place over it a cover-glass with a hair
  underneath to prevent pressure upon the cells. Examine with a microscope
  under a high power. The cilia move very rapidly when quite fresh, and
  are therefore not easily seen.

For additional experiments which pertain to the microscopic examination of
the elementary tissues and to other points in practical histology, see
Chapter XV.

    [NOTE. Inasmuch as most of the experimental work of this chapter
    depends upon the use of the microscope and also necessarily assumes a
    knowledge of facts which are discussed later, it would be well to
    postpone experiments in histology until they can be more
    satisfactorily handled in connection with kindred topics as they are
    met with in the succeeding chapters.]




Chapter II.

The Bones.



27. The Skeleton. Most animals have some kind of framework to support
and protect the soft and fleshy parts of their bodies. This framework
consists chiefly of a large number of bones, and is called the
skeleton. It is like the keel and ribs of a vessel or the frame of a
house, the foundation upon which the bodies are securely built.

There are in the adult human body 200 distinct bones, of many sizes and
shapes. This number does not, however, include several small bones found
in the tendons of muscles and in the ear. The teeth are not usually
reckoned as separate bones, being a part of the structure of the skin.

The number of distinct bones varies at different periods of life. It is
greater in childhood than in adults, for many bones which are then
separate, to allow growth, afterwards become gradually united. In early
adult life, for instance, the skull contains 22 naturally separate bones,
but in infancy the number is much greater, and in old age far less.

The bones of the body thus arranged give firmness, strength, and
protection to the soft tissues and vital organs, and also form levers for
the muscles to act upon.

28. Chemical Composition of Bone. The bones, thus forming the
framework of the body, are hard, tough, and elastic. They are twice as
strong as oak; one cubic inch of compact bone will support a weight of
5000 pounds. Bone is composed of earthy or mineral matter
(chiefly in the form of lime salts), and of animal matter
(principally gelatine), in the proportion of two-thirds of the former to
one-third of the latter.

[Illustration: Fig. 10.--The Skeleton.]

The proportion of earthy to animal matter varies with age. In infancy the
bones are composed almost wholly of animal matter. Hence, an infant's
bones are rarely broken, but its legs may soon become misshapen if walking
is allowed too early. In childhood, the bones still contain a larger
percentage of animal matter than in more advanced life, and are therefore
more liable to bend than to break; while in old age, they contain a
greater percentage of mineral matter, and are brittle and easily broken.

  Experiment 3. _To show the mineral matter in bone_. Weigh a large
  soup bone; put it on a hot, clear fire until it is at a red heat. At
  first it becomes black from the carbon of its organic matter, but at
  last it turns white. Let it cool and weigh again. The animal matter has
  been burnt out, leaving the mineral or earthy part, a white, brittle
  substance of exactly the same shape, but weighing only about two-thirds
  as much as the bone originally weighed.

  Experiment 4. _To show the animal matter in bone_. Add a
  teaspoonful of muriatic acid to a pint of water, and place the mixture
  in a shallow earthen dish. Scrape and clean a chicken's leg bone, part
  of a sheep's rib, or any other small, thin bone. Soak the bone in the
  acid mixture for a few days. The earthy or mineral matter is slowly
  dissolved, and the bone, although retaining its original form, loses its
  rigidity, and becomes pliable, and so soft as to be readily cut. If the
  experiment be carefully performed, a long, thin bone may even be tied
  into a knot.

  [Illustration: Fig. 11.--The fibula tied into a knot, after the hard
  mineral matter has been dissolved by acid.]

29. Physical Properties of Bone. If we take a leg bone of a sheep, or
a large end of beef shin bone, and saw it lengthwise in halves, we see two
distinct structures. There is a hard and compact tissue, like ivory,
forming the outside shell, and a spongy tissue inside having the
appearance of a beautiful lattice work. Hence this is called cancellous
tissue, and the gradual transition from one to the other is apparent.

It will also be seen that the shaft is a hollow cylinder, formed of
compact tissue, enclosing a cavity called the medullary canal, which is
filled with a pulpy, yellow fat called _marrow_. The marrow is richly
supplied with blood-vessels, which enter the cavity through small openings
in the compact tissue. In fact, all over the surface of bone are minute
canals leading into the substance. One of these, especially constant and
large in many bones, is called the _nutrient foramen_, and transmits an
artery to nourish the bone.

At the ends of a long bone, where it expands, there is no medullary canal,
and the bony tissue is spongy, with only a thin layer of dense bone around
it. In flat bones we find two layers or plates of compact tissue at the
surface, and a spongy tissue between. Short and irregular bones have no
medullary canal, only a thin shell of dense bone filled with cancellous
tissue.

[Illustration: Fig 12.--The Right femur sawed in two, lengthwise. (Showing
arrangement of compact and cancellous tissue.)]

  Experiment 5. Obtain a part of a beef shin bone, or a portion of a
  sheep's or calf's leg, including if convenient the knee joint. Have the
  bone sawed in two, lengthwise, keeping the marrow in place. Boil,
  scrape, and carefully clean one half. Note the compact and spongy parts,
  shaft, etc.

  Experiment 6. Trim off the flesh from the second half. Note the
  pinkish white appearance of the bone, the marrow, and the tiny specks of
  blood, etc. Knead a small piece of the marrow in the palm; note the oily
  appearance. Convert some marrow into a liquid by heating. Contrast this
  fresh bone with an old dry one, as found in the fields. Fresh bones
  should be kept in a cool place, carefully wrapped in a damp cloth, while
  waiting for class use.

A fresh or living bone is covered with a delicate, tough, fibrous
membrane, called the periosteum. It adheres very closely to the bone,
and covers every part except at the joints and where it is protected with
cartilage. The periosteum is richly supplied with blood-vessels, and plays
a chief part in the growth, formation, and repair of bone. If a portion of
the periosteum be detached by injury or disease, there is risk that a
layer of the subjacent bone will lose its vitality and be cast off.[5]

30. Microscopic Structure of Bone. If a very thin slice of bone be
cut from the compact tissue and examined under a microscope, numerous
minute openings are seen. Around these are arranged rings of bone, with
little black bodies in them, from which radiate fine, dark lines. These
openings are sections of canals called _Haversian canals_, after Havers,
an English physician, who first discovered them. The black bodies are
minute cavities called _lacunæ_, while the fine lines are very minute
canals, _canaliculi_, which connect the lacunæ and the Haversian canals.
These Haversian canals are supplied with tiny blood-vessels, while the
lacunæ contain bone cells. Very fine branches from these cells pass into
the canaliculi. The Haversian canals run lengthwise of the bone; hence if
the bone be divided longitudinally these canals will be opened along their
length (Fig. 13).

Thus bones are not dry, lifeless substances, but are the very type of
activity and change. In life they are richly supplied with blood from the
nutrient artery and from the periosteum, by an endless network of
nourishing canals throughout their whole structure. Bone has, therefore,
like all other living structures, a _self-formative_ power, and draws from
the blood the materials for its own nutrition.

[Illustration: Fig. 13.

  A, longitudinal section of bone, by which the Haversian canals are seen
     branching and communicating with one another;
  B, cross section of a very thin slice of bone, magnified about 300
     diameters--little openings (Haversian canals) are seen, and around
     them are ranged rings of bones with little black bodies (lacunæ), from
     which branch out fine dark lines (canaliculi);
  C, a bone cell, highly magnified, lying in lacuna.
]



The Bones of the Head.


31. The Head, or Skull. The bones of the skeleton, the bony framework
of our bodies, may be divided into those of the head, the trunk,
and the limbs.

The bones of the head are described in two parts,--those of the
cranium, or brain-case, and those of the face. Taken together,
they form the skull. The head is usually said to contain 22 bones, of
which 8 belong to the cranium and 14 to the face. In early childhood, the
bones of the head are separate to allow the brain to expand; but as we
grow older they gradually unite, the better to protect the delicate brain
tissue.

32. The Cranium. The cranium is a dome-like structure, made up
in the adult of 8 distinct bones firmly locked together. These bones are:

  One Frontal,
  Two Parietal,
  Two Temporal
  One Occipital,
  One Sphenoid,
  One Ethmoid.

The frontal bone forms the forehead and front of the head. It is
united with the two parietal bones behind, and extends over the forehead
to make the roofs of the sockets of the eyes. It is this bone which, in
many races of man, gives a dignity of person and a beauty of form seen in
no other animal.

The parietal bones form the sides and roof of the skull. They are
bounded anteriorly by the frontal bone, posteriorly by the occipital, and
laterally by the temporal and sphenoid bones. The two bones make a
beautiful arch to aid in the protection of the brain.

The temporal bones, forming the temples on either side, are attached
to the sphenoid bone in front, the parietals above, and the occipital
behind. In each temporal bone is the cavity containing the organs of
hearing. These bones are so called because the hair usually first turns
gray over them.

The occipital bone forms the lower part of the base of the skull, as
well as the back of the head. It is a broad, curved bone, and rests on the
topmost vertebra (atlas) of the backbone; its lower part is pierced by a
large oval opening called the _foramen magnum_, through which the spinal
cord passes from the brain (Fig. 15).

The sphenoid bone is in front of the occipital, forming a part of the
base of the skull. It is wedged between the bones of the face and those of
the cranium, and locks together fourteen different bones. It bears a
remarkable resemblance to a bat with extended wings, and forms a series of
girders to the arches of the cranium.

The ethmoid bone is situated between the bones of the cranium and
those of the face, just at the root of the nose. It forms a part of the
floor of the cranium. It is a delicate, spongy bone, and is so called
because it is perforated with numerous holes like a sieve, through which
the nerves of smell pass from the brain to the nose.

[Illustration: Fig. 14.--The Skull]

33. The Face. The bones of the face serve, to a marked extent, in
giving form and expression to the human countenance. Upon these bones
depend, in a measure, the build of the forehead, the shape of the chin,
the size of the eyes, the prominence of the cheeks, the contour of the
nose, and other marks which are reflected in the beauty or ugliness of the
face.

The face is made up of fourteen bones which, with the exception of
the lower jaw, are, like those of the cranium, closely interlocked with
each other. By this union these bones help form a number of cavities which
contain most important and vital organs. The two deep, cup-like sockets,
called the orbits, contain the organs of sight. In the cavities of the
nose is located the sense of smell, while the buccal cavity, or mouth, is
the site of the sense of taste, and plays besides an important part in the
first act of digestion and in the function of speech.

The bones of the face are:

  Two Superior Maxillary,
  Two Malar,
  Two Nasal,
  Two Lachrymal,
  Two Palate,
  Two Turbinated,
  One Vomer,
  One Lower Maxillary.

34. Bones of the Face. The superior maxillary or upper jawbones
form a part of the roof of the mouth and the entire floor of the orbits.
In them is fixed the upper set of teeth.

The malar or cheek bones are joined to the upper jawbones, and help
form the sockets of the eyes. They send an arch backwards to join the
temporal bones. These bones are remarkably thick and strong, and are
specially adapted to resist the injury to which this part of the face is
exposed.

The nasal or nose bones are two very small bones between the eye
sockets, which form the bridge of the nose. Very near these bones are the
two small lachrymal bones. These are placed in the inner angles of
the orbit, and in them are grooves in which lie the ducts through which
the tears flow from the eyes to the nose.

The palate bones are behind those of the upper jaw and with them form
the bony part of the roof of the mouth. The inferior turbinated are
spongy, scroll-like bones, which curve about within the nasal cavities so
as to increase the surface of the air passages of the nose.

The vomer serves as a thin and delicate partition between the two cavities
of the nose. It is so named from its resemblance to a ploughshare.

[Illustration: Fig. 15.--The Base of the Skull.

  A, palate process of upper jawbone;
  B, zygoma, forming zygomatic arch;
  C, condyle for forming articulation with atlas;
  D, foramen magnum;
  E, occipital bone.
]

The longest bone in the face is the inferior maxillary, or lower jaw.
It has a horseshoe shape, and supports the lower set of teeth. It is the
only movable bone of the head, having a vertical and lateral motion by
means of a hinge joint with a part of the temporal bone.


35. Sutures of the Skull. Before leaving the head we must notice the
peculiar and admirable manner in which the edges of the bones of the outer
shell of the skull are joined together. These edges of the bones resemble
the teeth of a saw. In adult life these tooth-like edges fit into each
other and grow together, suggesting the dovetailed joints used by the
cabinet-maker. When united these serrated edges look almost as if sewed
together; hence their name, sutures. This manner of union gives unity
and strength to the skull.

In infants, the corners of the parietal bones do not yet meet, and the
throbbing of the brain may be seen and felt under these "soft spots," or
_fontanelles_, as they are called. Hence a slight blow to a babe's head
may cause serious injury to the brain (Fig. 14).



The Bones of the Trunk.


36. The Trunk. The trunk is that central part of the body which
supports the head and the upper pair of limbs. It divides itself into an
upper cavity, the thorax, or chest; and a lower cavity, the
abdomen. These two cavities are separated by a movable, muscular
partition called the diaphragm, or midriff (Figs. 9 and 49).

The bones of the trunk are variously related to each other, and some of
them become united during adult life into bony masses which at earlier
periods are quite distinct. For example, the sacrum is in early life made
up of five distinct bones which later unite into one.

The upper cavity, or chest, is a bony enclosure formed by the
breastbone, the ribs, and the spine. It contains the heart and the lungs
(Fig. 86).

The lower cavity, or abdomen, holds the stomach, liver, intestines,
spleen, kidneys, and some other organs (Fig. 59).

The bones of the trunk may be subdivided into those of the spine, the
ribs, and the hips.

The trunk includes 54 bones usually thus arranged:

   I. Spinal Column, 26 bones:
     7 Cervical Vertebræ.
    12 Dorsal Vertebræ.
     5 Lumbar Vertebræ.
     1 Sacrum.
     1 Coccyx.

  II. Ribs, 24 bones:
    14 True Ribs.
     6 False Ribs.
     4 Floating Ribs.

 III. Sternum.

  IV. Two Hip Bones.

   V. Hyoid Bone.

37. The Spinal Column. The spinal column, or backbone, is a
marvelous piece of mechanism, combining offices which nothing short of
perfection in adaptation and arrangement could enable it to perform. It is
the central structure to which all the other parts of the skeleton are
adapted. It consists of numerous separate bones, called vertebræ. The
seven upper ones belong to the neck, and are called cervical
vertebræ. The next twelve are the dorsal vertebræ; these belong to
the back and support the ribs. The remaining five belong to the loins, and
are called lumbar vertebræ. On looking at the diagram of the backbone
(Fig. 9) it will be seen that the vertebræ increase in size and strength
downward, because of the greater burden they have to bear, thus clearly
indicating that an erect position is the one natural to man.

[Illustration: Fig. 16.--The Spinal Column.]

This column supports the head, encloses and protects the spinal cord, and
forms the basis for the attachment of many muscles, especially those which
maintain the body in an erect position. Each vertebra has an opening
through its center, and the separate bones so rest, one upon another, that
these openings form a continuous canal from the head to the lower part of
the spine. The great nerve, known as the spinal cord, extends from
the cranium through the entire length of this canal. All along the spinal
column, and between each two adjoining bones, are openings on each side,
through which nerves pass out to be distributed to various parts of the
body.

Between the vertebræ are pads or cushions of cartilage. These act as
"buffers," and serve to give the spine strength and elasticity and to
prevent friction of one bone on another. Each vertebra consists of a body,
the solid central portion, and a number of projections called processes.
Those which spring from the posterior of each arch are the spinous
processes. In the dorsal region they are plainly seen and felt in thin
persons.

The bones of the spinal column are arranged in three slight and graceful
curves. These curves not only give beauty and strength to the bony
framework of the body, but also assist in the formation of cavities for
important internal organs. This arrangement of elastic pads between the
vertebræ supplies the spine with so many elastic springs, which serve to
break the effect of shock to the brain and the spinal cord from any sudden
jar or injury.

The spinal column rests on a strong three-sided bone called the
sacrum, or sacred-bone, which is wedged in between the hip bones and
forms the keystone of the pelvis. Joined to the lower end of the sacrum is
the coccyx, or cuckoo-bone, a tapering series of little bones.

  Experiment 7. Run the tips of the fingers briskly down the
  backbone, and the spines of the vertebræ will be tipped with red so that
  they can be readily counted. Have the model lean forward with the arms
  folded across the chest; this will make the spines of the vertebræ more
  prominent.

  Experiment 8. _To illustrate the movement of torsion in the spine,
  or its rotation round its own axis_. Sit upright, with the back and
  shoulders well applied against the back of a chair. Note that the head
  and neck can be turned as far as 60° or 70°. Now bend forwards, so as to
  let the dorsal and lumbar vertebræ come into play, and the head can be
  turned 30° more.

  Experiment 9. _To show how the spinal vertebræ make a firm but
  flexible column._ Take 24 hard rubber overcoat buttons, or the same
  number of two-cent pieces, and pile them on top of each other. A thin
  layer of soft putty may be put between the coins to represent the pads
  of cartilage between the vertebræ. The most striking features of the
  spinal column may be illustrated by this simple apparatus.

38. How the Head and Spine are Joined together. The head rests upon
the spinal column in a manner worthy of special notice. This consists in
the peculiar structure of the first two cervical vertebræ, known as the
axis and atlas. The atlas is named after the fabled giant who
supported the earth on his shoulders. This vertebra consists of a ring of
bone, having two cup-like sockets into which fit two bony projections
arising on either side of the great opening (_foramen magnum_) in the
occipital bone. The hinge joint thus formed allows the head to nod
forward, while ligaments prevent it from moving too far.

On the upper surface of the axis, the second vertebra, is a peg or
process, called the _odontoid process_ from its resemblance to a tooth.
This peg forms a pivot upon which the head with the atlas turns. It is
held in its place against the front inner surface of the atlas by a band
of strong ligaments, which also prevents it from pressing on the delicate
spinal cord. Thus, when we turn the head to the right or left, the skull
and the atlas move together, both rotating on the odontoid process of the
axis.


39. The Ribs and Sternum. The barrel-shaped framework of the chest is
in part composed of long, slender, curved bones called ribs. There
are twelve ribs on each side, which enclose and strengthen the chest; they
somewhat resemble the hoops of a barrel. They are connected in pairs with
the dorsal vertebræ behind.

The first seven pairs, counting from the neck, are called the _true_ ribs,
and are joined by their own special cartilages directly to the breastbone.
The five lower pairs, called the _false_ ribs, are not directly joined to
the breastbone, but are connected, with the exception of the last two,
with each other and with the last true ribs by cartilages. These elastic
cartilages enable the chest to bear great blows with impunity. A blow on
the sternum is distributed over fourteen elastic arches. The lowest two
pairs of false ribs, are not joined even by cartilages, but are quite free
in front, and for this reason are called _floating_ ribs.

The ribs are not horizontal, but slope downwards from the backbone, so
that when raised or depressed by the strong intercostal muscles, the size
of the chest is alternately increased or diminished. This movement of the
ribs is of the utmost importance in breathing (Fig. 91).

The sternum, or breastbone, is a long, flat, narrow bone forming the
middle front wall of the chest. It is connected with the ribs and with the
collar bones. In shape it somewhat resembles an ancient dagger.

40. The Hip Bones. Four immovable bones are joined together so as to
form at the lower extremity of the trunk a basin-like cavity called the
pelvis. These four bones are the sacrum and the coccyx,
which have been described, and the two hip bones.

[Illustration: Fig. 17.--Thorax. (Anterior view.)]

The hip bones are large, irregularly shaped bones, very firm and
strong, and are sometimes called the haunch bones or _ossa innominata_
(nameless bones). They are united to the sacrum behind and joined to each
other in front. On the outer side of each hip bone is a deep cup, or
socket, called the _acetabulum_, resembling an ancient vinegar cup, into
which fits the rounded head of the thigh bone. The bones of the pelvis are
supported like a bridge on the legs as pillars, and they in turn contain
the internal organs in the lower part of the trunk.

41. The Hyoid Bone. Under the lower jaw is a little horseshoe shaped
bone called the hyoid bone, because it is shaped like the Greek
letter upsilon (Υ). The root of the tongue is fastened to its bend,
and the larynx is hung from it as from a hook. When the neck is in its
natural position this bone can be plainly felt on a level with the lower
jaw and about one inch and a half behind it. It serves to keep open the
top of the larynx and for the attachment of the muscles, which move the
tongue. (See Fig. 46.) The hyoid bone, like the knee-pan, is not connected
with any other bone.



The Bones of the Upper Limbs.


42. The Upper Limbs. Each of the upper limbs consist of the upper
arm, the forearm, and the hand. These bones are classified
as follows:

    Upper Arm:
      Scapula, or shoulder-blade,
      Clavicle, or collar bone,
      Humerus, or arm bone,

    Forearm:
      Ulna,
      Radius,

    Hand:
      8 Carpal or wrist bones,
      5 Metacarpal bones,
     14 Phalanges, or finger bones,

making 32 bones in all.


43. The Upper Arm. The two bones of the shoulder, the scapula
and the clavicle, serve in man to attach the arm to the trunk. The
scapula, or shoulder-blade, is a flat, triangular bone, placed point
downwards, and lying on the upper and back part of the chest, over the
ribs. It consists of a broad, flat portion and a prominent ridge or
_spine_. At its outer angle it has a shallow cup known as the _glenoid
cavity_. Into this socket fits the rounded head of the humerus. The
shoulder-blade is attached to the trunk chiefly by muscles, and is capable
of extensive motion.

The clavicle, or collar bone, is a slender bone with a double curve
like an italic _f_, and extends from the outer angle of the shoulder-blade
to the top of the breastbone. It thus serves like the keystone of an arch
to hold the shoulder-blade firmly in its place, but its chief use is to
keep the shoulders wide apart, that the arm may enjoy a freer range of
motion. This bone is often broken by falls upon the shoulder or arm.

The humerus is the strongest bone of the upper extremity. As already
mentioned, its rounded head fits into the socket of the shoulder-blade,
forming a ball-and-socket joint, which permits great freedom of motion.
The shoulder joint resembles what mechanics call a universal joint, for
there is no part of the body which cannot be touched by the hand.

[Illustration: Fig. 18.--Left Scapula, or Shoulder-Blade.]

When the shoulder is dislocated the head of the humerus has been forced
out of its socket. The lower end of the bone is grooved to help form a
hinge joint at the elbow with the bones of the forearm (Fig. 27).

44. The Forearm. The forearm contains two long bones, the
ulna and the radius. The ulna, so called because it forms
the elbow, is the longer and larger bone of the forearm, and is on the
same side as the little finger. It is connected with the humerus by a
hinge joint at the elbow. It is prevented from moving too far back by a
hook-like projection called the _olecranon process_, which makes the sharp
point of the elbow.

The radius is the shorter of the two bones of the forearm, and is on
the same side as the thumb. Its slender, upper end articulates with the
ulna and humerus; its lower end is enlarged and gives attachment in part
to the bones of the wrist. This bone radiates or turns on the ulna,
carrying the hand with it.

  Experiment 10. Rest the forearm on a table, with the palm up (an
  attitude called supination). The radius is on the outer side and
  parallel with the ulna If now, without moving the elbow, we turn the
  hand (pronation), as if to pick up something from the table, the radius
  may be seen and felt crossing over the ulna, while the latter has not
  moved.

[Illustration: Fig. 19.--Left Clavicle, or Collar Bone. (Anterior
surface.)]

45. The Hand. The hand is the executive or essential part of the
upper limb. Without it the arm would be almost useless. It consists of 27
separate bones, and is divided into three parts, the wrist, the
palm, and the fingers.

[Illustration: Fig. 20.--Left Humerus.]

[Illustration: Fig. 21.--Left Radius and Ulna.]

The carpus, or wrist, includes 8 short bones, arranged in two rows of
four each, so as to form a broad support for the hand. These bones are
closely packed, and tightly bound with ligaments which admit of ample
flexibility. Thus the wrist is much less liable to be broken than if it
were to consist of a single bone, while the elasticity from having the
eight bones movable on each other, neutralizes, to a great extent, a
shock caused by falling on the hands. Although each of the wrist bones has
a very limited mobility in relation to its neighbors, their combination
gives the hand that freedom of action upon the wrist, which is manifest in
countless examples of the most accurate and delicate manipulation.

The metacarpal bones are the five long bones of the back of the hand.
They are attached to the wrist and to the finger bones, and may be easily
felt by pressing the fingers of one hand over the back of the other. The
metacarpal bones of the fingers have little freedom of movement, while the
thumb, unlike the others, is freely movable. We are thus enabled to bring
the thumb in opposition to each of the fingers, a matter of the highest
importance in manipulation. For this reason the loss of the thumb disables
the hand far more than the loss of either of the fingers. This very
significant opposition of the thumb to the fingers, furnishing the
complete grasp by the hand, is characteristic of the human race, and is
wanting in the hand of the ape, chimpanzee, and ourang-outang.

The phalanges, or finger bones, are the fourteen small bones arranged
in three rows to form the fingers. Each finger has three bones; each
thumb, two.

The large number of bones in the hand not only affords every variety of
movement, but offers great resistance to blows or shocks. These bones are
united by strong but flexible ligaments. The hand is thus given strength
and flexibility, and enabled to accomplish the countless movements so
necessary to our well-being.

In brief, the hand is a marvel of precise and adapted mechanism, capable
not only of performing every variety of work and of expressing many
emotions of the mind, but of executing its orders with inconceivable
rapidity.



The Bones of the Lower Limbs.


46. The Lower Limbs. The general structure and number of the bones of
the lower limbs bear a striking similarity to those of the upper limbs.
Thus the leg, like the arm, is arranged in three parts, the thigh,
the lower leg, and the foot. The thigh bone corresponds to the
humerus; the tibia and fibula to the ulna and radius; the ankle to the
wrist; and the metatarsus and the phalanges of the foot, to the metacarpus
and the phalanges of the hand.

The bones of the lower limbs may be thus arranged:

  Thigh: Femur, or thigh bone,

  Lower Leg:
    Patella, or knee cap,
    Tibia, or shin bone,
    Fibula, or splint bone,

  Foot:
    7 Tarsal or ankle bones,
    5 Metatarsal or instep bones,
   14 Phalanges, or toes bones,

making 30 bones in all.

[Illustration: Fig. 22.--Right Femur, or Thigh Bone.]

47. The Thigh. The longest and strongest of all the bones is the
femur, or thigh bone. Its upper end has a rounded head which fits into the
_acetabulum_, or the deep cup-like cavity of the hip bone, forming a
perfect ball-and-socket joint. When covered with cartilage, the ball fits
so accurately into its socket that it may be retained by atmospheric
pressure alone (sec. 50).

The shaft of the femur is strong, and is ridged and roughened in places
for the attachment of the muscles. Its lower end is broad and irregularly
shaped, having two prominences called _condyles_, separated by a groove,
the whole fitted for forming a hinge joint with the bones of the lower leg
and the knee-cap.


48. The Lower Leg. The lower leg, like the forearm, consists of
two bones. The tibia, or shin bone, is the long three-sided bone
forming the front of the leg. The sharp edge of the bone is easily felt
just under the skin. It articulates with the lower end of the thigh bone,
forming with it a hinge joint.

The fibula, the companion bone of the tibia, is the long, slender
bone on the outer side of the leg. It is firmly fixed to the tibia at each
end, and is commonly spoken of as the small bone of the leg. Its lower end
forms the outer projection of the ankle. In front of the knee joint,
embedded in a thick, strong tendon, is an irregularly disk-shaped bone,
the patella, or knee-cap. It increases the leverage of important
muscles, and protects the front of the knee joint, which is, from its
position, much exposed to injury.

[Illustration: Fig. 23.--Patella, or Knee-Cap.]

49. The Foot. The bones of the foot, 26 in number, consist of
the tarsal bones, the metatarsal, and the phalanges. The
tarsal bones are the seven small, irregular bones which make up the
ankle. These bones, like those of the wrist, are compactly arranged, and
are held firmly in place by ligaments which allow a considerable amount of
motion.

One of the ankle bones, the _os calcis_, projects prominently backwards,
forming the heel. An extensive surface is thus afforded for the attachment
of the strong tendon of the calf of the leg, called the tendon of
Achilles. The large bone above the heel bone, the _astragalus_,
articulates with the tibia, forming a hinge joint, and receives the weight
of the body.

The metatarsal bones, corresponding to the metacarpals of the hand,
are five in number, and form the lower instep.

The phalanges are the fourteen bones of the toes,--three in each
except the great toe, which, like the thumb, has two. They resemble in
number and plan the corresponding bones in the hand. The bones of the foot
form a double arch,--an arch from before backwards, and an arch from side
to side. The former is supported behind by the os calcis, and in front by
the ends of the metatarsal bones. The weight of the body falls
perpendicularly on the astragalus, which is the key-bone or crown of the
arch. The bones of the foot are kept in place by powerful ligaments,
combining great strength with elasticity.

[Illustration: Fig. 24.--Right Tibia and Fibula (Anterior surface.)]

[Illustration: Fig. 25.--Bones of Right Foot. (Dorsal surface.)]



The Joints.


50. Formation of Joints. The various bones of the skeleton are
connected together at different parts of their surfaces by joints, or
articulations. Many different kinds of joints have been described, but the
same general plan obtains for nearly all. They vary according to the kind
and the amount of motion.

The principal structures which unite in the formation of a joint are:
bone, cartilage, synovial membrane, and ligaments. Bones make
the chief element of all the joints, and their adjoining surfaces are
shaped to meet the special demands of each joint (Fig. 27). The joint-end
of bones is coated with a thin layer of tough, elastic cartilage. This is
also used at the edge of joint-cavities, forming a ring to deepen them.
The rounded heads of bones which move in them are thus more securely held
in their sockets.

Besides these structures, the muscles also help to maintain the
joint-surfaces in proper relation. Another essential to the action of the
joints is the pressure of the outside air. This may be sufficient to keep
the articular surfaces in contact even after all the muscles are removed.
Thus the hip joint is so completely surrounded by ligaments as to be
air-tight; and the union is very strong. But if the ligaments be pierced
and air allowed to enter the joint, the union at once becomes much less
close, and the head of the thigh bone falls away as far as the ligaments
will allow it.

51. Synovial Membrane. A very delicate connective tissue, called the
synovial membrane, lines the capsules of the joints, and covers the
ligaments connected with them. It secretes the _synovia_, or joint oil, a
thick and glairy fluid, like the white of a raw egg, which thoroughly
lubricates the inner surfaces of the joints. Thus the friction and heat
developed by movement are reduced, and every part of a joint is enabled to
act smoothly.

52. Ligaments. The bones are fastened together, held in place, and
their movements controlled, to a certain extent, by bands of various
forms, called ligaments. These are composed mainly of bundles of
white fibrous tissue placed parallel to, or closely interlaced with, one
another, and present a shining, silvery aspect. They extend from one of
the articulating bones to another, strongly supporting the joint, which
they sometimes completely envelope with a kind of cap (Fig. 28). This
prevents the bones from being easily dislocated. It is difficult, for
instance, to separate the two bones in a shoulder or leg of mutton, they
are so firmly held together by tough ligaments.

While ligaments are pliable and flexible, permitting free movement, they
are also wonderfully strong and inextensible. A bone may be broken, or its
end torn off, before its ligaments can be ruptured. The wrist end of the
radius, for instance, is often torn off by force exerted on its ligaments
without their rupture.

The ligaments are so numerous and various and are in some parts so
interwoven with each other, that space does not allow even mention of
those that are important. At the knee joint, for instance, there are no
less than fifteen distinct ligaments.

53. Imperfect Joints. It is only perfect joints that are fully
equipped with the structures just mentioned. Some joints lack one or more,
and are therefore called imperfect joints. Such joints allow little or no
motion and have no smooth cartilages at their edges. Thus, the bones of
the skull are dovetailed by joints called sutures, which are immovable.
The union between the vertebræ affords a good example of imperfect joints
which are partially movable.

[Illustration: Fig. 26.--Elastic Tissue from the Ligaments about Joints.
(Highly magnified.)]

54. Perfect Joints. There are various forms of perfect joints,
according to the nature and amount of movement permitted. They an divided
into hinge joints, ball-and-socket joints and pivot joints.

The hinge joints allow forward and backward movements like a hinge.
These joints are the most numerous in the body, as the elbow, the ankle,
and the knee joints.

In the ball-and-socket joints--a beautiful contrivance--the rounded
head of one bone fits into a socket in the other, as the hip joint and
shoulder joint. These joints permit free motion in almost every direction.

In the pivot joint a kind of peg in one bone fits into a notch in
another. The best example of this is the joint between the first and
second vertebræ (see sec. 38). The radius moves around on the ulna by
means of a pivot joint. The radius, as well as the bones of the wrist and
hand, turns around, thus enabling us to turn the palm of the hand upwards
and downwards. In many joints the extent of motion amounts to only a
slight gliding between the ends of the bones.

55. Uses of the Bones. The bones serve many important and useful
purposes. The skeleton, a general framework, affords protection,
support, and leverage to the bodily tissues. Thus, the bones of
the skull and of the chest protect the brain, the lungs, and the heart;
the bones of the legs support the weight of the body; and the long bones
of the limbs are levers to which muscles are attached.

Owing to the various duties they have to perform, the bones are
constructed in many different shapes. Some are broad and flat;
others, long and cylindrical; and a large number very irregular
in form. Each bone is not only different from all the others, but is also
curiously adapted to its particular place and use.

[Illustration: Fig. 27.--Showing how the Ends of the Bones are shaped to
form the Elbow Joint. (The cut ends of a few ligaments are seen.)]

Nothing could be more admirable than the mechanism by which each one of
the bones is enabled to fulfill the manifold purposes for which it was
designed. We have seen how the bones of the cranium are united by sutures
in a manner the better to allow the delicate brain to grow, and to afford
it protection from violence. The arched arrangement of the bones of the
foot has several mechanical advantages, the most important being that it
gives firmness and elasticity to the foot, which thus serves as a support
for the weight of the body, and as the chief instrument of locomotion.

The complicated organ of hearing is protected by a winding series of
minute apartments, in the rock-like portion of the temporal bone. The
socket for the eye has a jutting ridge of bone all around it, to guard the
organ of vision against injury. Grooves and canals, formed in hard bone,
lodge and protect minute nerves and tiny blood-vessels. The surfaces of
bones are often provided with grooves, sharp edges, and rough projections,
for the origin and insertion of muscles.

[Illustration: Fig. 28.--External Ligaments of the Knee.]

56. The Bones in Infancy and Childhood. The bones of the infant,
consisting almost wholly of cartilage, are not stiff and hard as in after
life, but flexible and elastic. As the child grows, the bones become more
solid and firmer from a gradually increased deposit of lime salts. In time
they become capable of supporting the body and sustaining the action of
the muscles. The reason is that well-developed bones would be of no use to
a child that had not muscular strength to support its body. Again, the
numerous falls and tumbles that the child sustains before it is able to
walk, would result in broken bones almost every day of its life. As it is,
young children meet with a great variety of falls without serious injury.

But this condition of things has its dangers. The fact that a child's
bones bend easily, also renders them liable to permanent change of shape.
Thus, children often become bow-legged when allowed to walk too early.
Moderate exercise, however, even in infancy, promotes the health of the
bones as well as of the other tissues. Hence a child may be kept too long
in its cradle, or wheeled about too much in a carriage, when the full use
of its limbs would furnish proper exercise and enable it to walk earlier.

57. Positions at School. Great care must be exercised by teachers
that children do not form the habit of taking injurious positions at
school. The desks should not be too low, causing a forward stoop; or too
high, throwing one shoulder up and giving a twist to the spine. If the
seats are too low there will result an undue strain on the shoulder and
the backbone; if too high, the feet have no proper support, the thighs may
be bent by the weight of the feet and legs, and there is a prolonged
strain on the hips and back. Curvature of the spine and round shoulders
often result from long-continued positions at school in seats and at desks
which are not adapted to the physical build of the occupant.

[Illustration: Fig. 29.--Section of the Knee Joint. (Showing its internal
structure)

  A, tendon of the semi-membranosus muscle cut across;
  B, F, tendon of same muscle;
  C, internal condyle of femur;
  D, posterior crucial ligament;
  E, internal interarticular fibro cartilage;
  G, bursa under knee-cap;
  H, ligament of knee-cap;
  K, fatty mass under knee-cap;
  L, anterior crucial ligament cut across;
  P, patella, or knee-cap
]

A few simple rules should guide teachers and school officials in providing
proper furniture for pupils. Seats should be regulated according to the
size and age of the pupils, and frequent changes of seats should be made.
At least three sizes of desks should be used in every schoolroom, and more
in ungraded schools. The feet of each pupil should rest firmly on the
floor, and the edge of the desk should be about one inch higher than the
level of the elbows. A line dropped from the edge of the desk should
strike the front edge of the seat. Sliding down into the seat, bending too
much over the desk while writing and studying, sitting on one foot or
resting on the small of the back, are all ungraceful and unhealthful
positions, and are often taken by pupils old enough to know better. This
topic is well worth the vigilance of every thoughtful teacher, especially
of one in the lower grades.

58. The Bones in After Life. Popular impression attributes a less
share of life, or a lower grade of vitality, to the bones than to any
other part of the body. But really they have their own circulation and
nutrition, and even nervous relations. Thus, bones are the seat of active
vital processes, not only during childhood, but also in adult life,
and in fact throughout life, except perhaps in extreme old age. The final
knitting together of the ends of some of the bones with their shafts does
not occur until somewhat late in life. For example, the upper end of the
tibia and its shaft do not unite until the twenty-first year. The separate
bones of the sacrum do not fully knit into one solid bone until the
twenty-fifth year. Hence, the risk of subjecting the bones of young
persons to undue violence from injudicious physical exercise as in rowing,
baseball, football, and bicycle-riding.

The bones during life are constantly going through the process of
absorption and reconstruction. They are easily modified in their growth.
Thus the continued pressure of some morbid deposit, as a tumor or cancer,
or an enlargement of an artery, may cause the absorption or distortion of
bones as readily as of one of the softer tissues. The distortion resulting
from tight lacing is a familiar illustration of the facility with which
the bones may be modified by prolonged pressure.

Some savage races, not content with the natural shape of the head, take
special methods to mould it by continued artificial pressure, so that it
may conform in its distortion to the fashion of their tribe or race. This
custom is one of the most ancient and widespread with which we are
acquainted. In some cases the skull is flattened, as seen in certain
Indian tribes on our Pacific coast, while with other tribes on the same
coast it is compressed into a sort of conical appearance. In such cases
the brain is compelled, of course, to accommodate itself to the change in
the shape of the head; and this is done, it is said, without any serious
result.

59. Sprains and Dislocations. A twist or strain of the ligaments and
soft parts about a joint is known as a sprain, and may result from a
great variety of accidents. When a person falls, the foot is frequently
caught under him, and the twist comes upon the ligaments and tissues of
the ankle. The ligaments cannot stretch, and so have to endure the wrench
upon the joint. The result is a sprained ankle. Next to the ankle, a
sprain of the wrist is most common. A person tries, by throwing out his
hand, to save himself from a fall, and the weight of the body brings the
strain upon the firmly fixed wrist. As a result of a sprain, the ligaments
may be wrenched or torn, and even a piece of an adjacent bone may be torn
off; the soft parts about the injured joint are bruised, and the
neighboring muscles put to a severe stretch. A sprain may be a slight
affair, needing only a brief rest, or it may be severe and painful enough
to call for the most skillful treatment by a surgeon. Lack of proper care
in severe sprains often results in permanent lameness.

A fall or a blow may bring such a sudden wrench or twist upon the
ligaments as to force a bone out of place. This displacement is known as a
dislocation. A child may trip or fall during play and put his elbow
out of joint. A fall from horseback, a carriage, or a bicycle may result
in a dislocation of the shoulder joint. In playing baseball a swift ball
often knocks a finger out of joint. A dislocation must be reduced at once.
Any delay or carelessness may make a serious and painful affair of it, as
the torn and bruised parts rapidly swell and become extremely sensitive.

60. Broken Bones. The bones, especially those of the upper limbs, are
often fractured or broken. The _simple_ fracture is the most common
form, the bone being broken in a single place with no opening through the
skin. When properly adjusted, the bone heals rapidly. Sometimes bones are
crushed into a number of fragments; this is a _comminuted_ fracture.
When, besides the break, there is an opening through the soft parts and
surface of the body, we have a _compound_ fracture. This is a serious
injury, and calls for the best surgical treatment.

A bone may be bent, or only partly broken, or split. This is called "a
green-stick fracture," from its resemblance to a half-broken green stick.
This fracture is more common in the bones of children.

Fractures may be caused by direct violence, as when a bone is broken at a
certain point by some powerful force, as a blow from a baseball bat or a
fall from a horse. Again, a bone may be broken by indirect violence, as
when a person being about to fall, throws out his hand to save himself.
The force of the fall on the hand often breaks the wrist, by which is
meant the fracture of the lower end of the radius, often known as the
"silver-fork fracture." This accident is common in winter from a fall or
slip on the ice.

Sometimes bones are broken at a distance from the point of injury, as in a
fracture of the ribs by violent compression of the chest; or fracture may
occur from the vibration of a blow, as when a fall or blow upon the top of
the head produces fracture of the bones at the base of the brain.[6]

61. Treatment for Broken Bones. When a bone is broken a surgeon is
needed to set it, that is, to bring the broken parts into their natural
position, and retain them by proper appliances. Nature throws out between
and around the broken ends of bones a supply of repair material known as
plastic lymph, which is changed to fibrous tissue, then to cartilage, and
finally to bone. This material serves as a sort of cement to hold the
fractured parts together. The excess of this at the point of union can be
felt under the skin for some time after the bone is healed.

With old people a broken bone is often a serious matter, and may cripple
them for life or prove fatal. A trifling fall, for instance, may cause a
broken hip (popularly so called, though really a fracture of the neck of
the femur), from the shock of which, and the subsequent pain and
exhaustion, an aged person may die in a few weeks. In young people,
however, the parts of a broken bone will knit together in three or four
weeks after the fracture is reduced; while in adults, six or even more may
be required for firm union. After a broken bone is strong enough to be
used, it is fragile for some time; and great care must be taken,
especially with children, that the injured parts may not be broken again
before perfect union takes place.[7]

62. The Effect of Alcohol upon the Bones. While the growth of the
bones occurs, of course, mainly during the earlier years of life, yet they
do not attain their full maturity until about the twenty-fifth year; and
it is stated that in persons devoted to intellectual pursuits, the skull
grows even after that age. It is plainly necessary that during this period
of bone growth the nutrition of the body should be of the best, that the
bones may be built up from pure blood, and supplied with all the materials
for a large and durable framework. Else the body will be feeble and
stunted, and so through life fall short of its purpose.

If this bony foundation be then laid wrong, the defect can never be
remedied. This condition is seen in young persons who have been underfed
and overworked. But the use of alcoholic liquors produces a similar
effect, hindering bone cell-growth and preventing full development.[8]
The appetite is diminished, nutrition perverted and impaired, the stature
stunted, and both bodily and mental powers are enfeebled.

63. Effect of Tobacco upon the Bones. Another narcotic, the
destructive influence of which is wide and serious, is tobacco. Its
pernicious influence, like that of alcohol, is peculiarly hurtful to the
young, as the cell development during the years of growth is easily
disturbed by noxious agents. The bone growth is by cells, and a powerful
narcotic like tobacco retards cell-growth, and thus hinders the building
up of the bodily frame. The formation of healthy bone demands good,
nutritious blood, but if instead of this, the material furnished for the
production of blood is poor in quality or loaded with poisonous narcotics,
the body thus defrauded of its proper building material becomes undergrown
and enfeebled.

Two unfavorable facts accompany this serious drawback: one is, that owing
to the insidious nature of the smoky poison[9] (cigarettes are its worst
form) the cause may often be unsuspected, and so go on, unchecked; and the
other, that the progress of growth once interrupted, the gap can never be
fully made up. Nature does her best to repair damages and to restore
defects, but never goes backwards to remedy neglects.



Additional Experiments.

  Experiment 11. Take a portion of the decalcified bone obtained from
  Experiment 4, and wash it thoroughly in water: in this it is insoluble.
  Place it in a solution of carbonate of soda and wash it again. Boil it
  in water, and from it gelatine will be obtained.

  Experiment 12. Dissolve in hydrochloric acid a small piece of the
  powdered bone-ash obtained from Experiment 3. Bubbles of carbon dioxid
  are given off, indicating the presence of a carbonate. Dilute the
  solution; add an excess of ammonia, and we find a white precipitate of
  the phosphate of lime and of magnesia.

  Experiment 13. Filter the solution in the preceding experiment, and
  to the filtrate add oxalate of ammonia. The result is a white
  precipitate of the oxalate of lime, showing there is lime present, but
  not as a phosphate.

  Experiment 14. To the solution of mineral matters obtained from
  Experiment 3, add acetate of soda until free acetic acid is present,
  recognized by the smell (like dilute vinegar); then add oxalate of
  ammonia. The result will be a copious white precipitate of lime salts.

  Experiment 15. _To show how the cancellous structure of bone is
  able to support a great deal of weight_. Have the market-man saw out a
  cubic inch from the cancellous tissue of a fresh beef bone and place it
  on a table with its principal layers upright. Balance a heavy book upon
  it, and then gradually place upon it various articles and note how many
  pounds it will support before giving way.

  Experiment 16. Repeat the last experiment, using a cube of the
  decalcified bone obtained from Experiment 4.

    [NOTE. As the succeeding chapters are studied, additional experiments
    on bones and their relation to other parts of the body, will readily
    suggest themselves to the ingenious instructor or the thoughtful
    student. Such experiments may be utilized for review or other
    exercises.]


              Review Analysis: The Skeleton (206 bones).

                    /                 / 1 Frontal,
                   /                 /  2 Parietal,
                  /     I. Cranium  |   2 Temporal,
                 /       (8 bones)  |   1 Occipital,
                /                    \  1 Sphenoid,
               |                      \ 1 Ethmoid.
               |
               |                       / 2 Superior Maxillary,
   The Head    |                      /  2 Malar,
  (28 bones).  |                     /   2 Nasal,
               |       II. Face     |    2 Lachrymal Bones,
               |      (14 bones)    |    2 Palate Bones,
               |                     \   2 Turbinated,
               |                      \  1 Vomer,
               \                       \ 1 Lower Maxillary.
                \
                 \                   / Hammer,
                  \   III. The Ear  |  Anvil,
                   \   (6 bones)     \ Stirrup.

                  /                         /  7 Cervical Vertebræ.
                 /                         /  12 Dorsal Vertebræ,
                /       I. Spinal Column  |    5 Lumbar Vertebræ,
               |           (26 bones)      \     Sacrum,
               |                            \    Coccyx.
   The Trunk   |
  (54 bones).  |                       /  7 True Ribs,
               |       II. The Ribs   |   3 False Ribs,
               |        (24 bones)     \  2 Floating Ribs.
               |
                \     III. Sternum.
                 \     IV. Two Hip Bones.
                  \     V. Hyoid Bone.



                     /                    /   Scapula,
                    /      I. Upper Arm  |    Clavicle,
                   |                      \   Humerus.
                   |
  The Upper Limbs  |      II. Forearm    /    Ulna,
    (64 bones).    |                     \    Radius.
                   |
                   |                     /  8 Carpal Bones,
                    \    III. Hand      |   5 Metacarpal Bones,
                     \                   \ 14 Phalanges.

                     /     I. Thigh           Femur.
                    /
                   |                      /   Patella,
  The Lower Limbs  |      II. Lower Leg  |    Tibia,
    (60 bones).    |                      \   Fibula.
                   |
                   |                     /  7 Tarsal Bones,
                    \    III. Foot      |   5 Metatarsal Bones,
                     \                   \ 14 Phalanges.





Chapter III.

The Muscles.



64. Motion in Animals. All motion of our bodies is produced by means
of muscles. Not only the limbs are moved by them, but even the movements
of the stomach and of the heart are controlled by muscles. Every part of
the body which is capable of motion has its own special set of muscles.

Even when the higher animals are at rest it is possible to observe some
kind of motion in them. Trees and stones never move unless acted upon by
external force, while the infant and the tiniest insect can execute a
great variety of movements. Even in the deepest sleep the beating of the
heart and the motion of the chest never cease. In fact, the power to
execute spontaneous movement is the most characteristic property of
living animals.

65. Kinds of Muscles. Most of the bodily movements, such as affect
the limbs and the body as a whole, are performed by muscles under our
control. These muscles make up the red flesh or lean parts, which,
together with the fat, clothe the bony framework, and give to it general
form and proportion. We call these muscular tissues voluntary
muscles, because they usually act under the control of the will.

The internal organs, as those of digestion, secretion, circulation, and
respiration, perform their functions by means of muscular activity of
another kind, that is, by that of muscles not under our control. This work
goes on quite independently of the will, and during sleep. We call the
instruments of this activity involuntary muscles. The voluntary
muscles, from peculiarities revealed by the microscope, are also known as
striped or striated muscles. The involuntary from their smooth, regular
appearance under the microscope are called the unstriped or non-striated
muscles.

The two kinds of muscles, then, are the red, voluntary, striated
muscles, and the smooth, involuntary, non-striated muscles.

66. Structure of Voluntary Muscles. The main substance which clothes
the bony framework of the body, and which forms about two-fifths of its
weight, is the voluntary muscular tissue. These muscles do not cover and
surround the bones in continuous sheets, but consist of separate bundles
of flesh, varying in size and length, many of which are capable of
independent movement.

Each muscle has its own set of blood-vessels, lymphatics, and nerves. It
is the blood that gives the red color to the flesh. Blood-vessels and
nerves on their way to other parts of the body, do not pass through the
muscles, but between them. Each muscle is enveloped in its own sheath of
connective tissue, known as the fascia. Muscles are not usually
connected directly with bones, but by means of white, glistening cords
called tendons.

[Illustration: Fig. 30.--Striated (voluntary) Muscular Fibers.

  A, fiber serparating into disks;
  B, fibrillæ (highly magnified);
  C, cross section of a disk
]

If a small piece of muscle be examined under a microscope it is found to
be made up of bundles of fibers. Each fiber is enclosed within a
delicate, transparent sheath, known as the sarcolemma. If one of
these fibers be further examined under a microscope, it will be seen to
consist of a great number of still more minute fibers called
fibrillæ. These fibers are also seen marked cross-wise with dark
stripes, and can be separated at each stripe into disks. These cross
markings account for the name _striped_ or _striated_ muscle.

The fibrillæ, then, are bound together in a bundle to form a fiber, which
is enveloped in its own sheath, the sarcolemma. These fibers, in turn, are
further bound together to form larger bundles called fasciculi, and
these, too, are enclosed in a sheath of connective tissue. The muscle
itself is made up of a number of these fasciculi bound together by a
denser layer of connective tissue.

  Experiment 17. _To show the gross structure of muscle._ Take a
  small portion of a large muscle, as a strip of lean corned beef. Have it
  boiled until its fibers can be easily separated. Pick the bundles and
  fasciculi apart until the fibers are so fine as to be almost invisible
  to the naked eye. Continue the experiment with the help of a hand
  magnifying glass or a microscope.

67. The Involuntary Muscles. These muscles consist of ribbon-shaped
bands which surround hollow fleshy tubes or cavities. We might compare
them to India rubber rings on rolls of paper. As they are never attached
to bony levers, they have no need of tendons.

[Illustration: Fig. 31.--A, Muscular Fiber, showing Stripes, and Nuclei, b
and c. (Highly magnified.)]

The microscope shows these muscles to consist not of fibers, but of long
spindle-shaped cells, united to form sheets or bands. They have no
sarcolemma, stripes, or cross markings like those of the voluntary
muscles. Hence their name of _non-striated_, or _unstriped_, and _smooth_
muscles.

The involuntary muscles respond to irritation much less rapidly than do
the voluntary. The wave of contraction passes over them more slowly and
more irregularly, one part contracting while another is relaxing. This may
readily be seen in the muscular action of the intestines, called
vermicular motion. It is the irregular and excessive contraction of the
muscular walls of the bowels that produces the cramp-like pains of colic.

The smooth muscles are found in the tissues of the heart, lungs,
blood-vessels, stomach, and intestines. In the stomach their contraction
produces the motion by which the food is churned about; in the arteries
and veins they help supply the force by which the blood is driven along,
and in the intestines that by which the partly digested food is mainly
kept in motion.

Thus all the great vital functions are carried on, regardless of the will
of the individual, or of any outward circumstances. If it required an
effort of the will to control the action of the internal organs we could
not think of anything else. It would take all our time to attend to
living. Hence the care of such delicate and important machinery has wisely
been put beyond our control.

Thus, too, these muscles act instinctively without training; but the
voluntary need long and careful education. A babe can use the muscles of
swallowing on the first day of its life as well as it ever can. But as it
grows up, long and patient education of its voluntary muscles is needed to
achieve walking, writing, use of musical instruments, and many other acts
of daily life.

[Illustration: Fig. 32.--A Spindle Cell of Involuntary Muscle. (Highly
magnified.)]

  Experiment 18. _To show the general appearance of the muscles._
  Obtain the lower part of a sheep's or calf's leg, with the most of the
  lean meat and the hoof left on. One or more of the muscles with their
  bundles of fibers, fascia, and tendons; are readily made out with a
  little careful dissection. The dissection should be made a few days
  before it is wanted and the parts allowed to harden somewhat in dilute
  alcohol.

68. Properties of Muscular Tissue. The peculiar property of living
muscular tissue is irritability, or the capacity of responding to a
stimulus. When a muscle is irritated it responds by contracting. By this
act the muscle does not diminish its bulk to any extent; it simply changes
its form. The ends of the muscle are drawn nearer each other and the
middle is thicker.

Muscles do not shorten themselves all at once, but the contraction passes
quickly over them in the form of a wave. They are usually stimulated by
nervous action. The delicate nerve fibrils which end in the fibers
communicate with the brain, the center of the will power. Hence, when the
brain commands, a nervous impulse, sent along the nerve fibers, becomes
the exciting stimulus which acts upon the muscles and makes them shorter,
harder, and more rigid.[10]

Muscles, however, will respond to other than this usual stimulus. Thus an
electrical current may have a similar effect. Heat, also, may produce
muscular contraction. Mechanical means, such as a sharp blow or pinching,
may irritate a muscle and cause it to contract.

We must remember that this property of contraction is inherent and belongs
to the muscle itself. This power of contraction is often independent of
the brain. Thus, on pricking the heart of a fish an hour after removal
from its body, obvious contraction will occur. In this case it is not the
nerve force from the brain that supplies the energy for contraction. The
power of contraction is inherent in the muscle substance, and the stimulus
by irritating the nerve ganglia of the heart simply affords the
opportunity for its exercise.

Contraction is not, however, the natural state of a muscle. In time it is
tired, and begins to relax. Even the heart, the hardest-working muscle,
has short periods of rest between its beats. Muscles are highly elastic as
well as contractile. By this property muscle yields to a stretching force,
and returns to its original length if the stretching has not been
excessive.

[Illustration: Fig. 33.--Principal Muscles of the Body. (Anterior view.)]

69. The Object of Contraction. The object of contraction is obvious.
Like rubber bands, if one end of a muscle be fixed and the other attached
to some object which is free to move, the contraction of the muscle will
bring the movable body nearer to the fixed point. A weight fastened to the
free end of a muscle may be lifted when the muscle contracts. Thus by
their contraction muscles are able to do their work. They even
contract more vigorously when resistance is opposed to them than when it
is not. With increased weight there is an increased amount of work to be
done. The greater resistance calls forth a greater action of the muscle.
This is true up to a certain point, but when the limit has been passed,
the muscle quickly fails to respond.

Again, muscles work best with a certain degree of rapidity provided the
irritations do not follow each other too rapidly. If, however, the
contractions are too rapid, the muscles become exhausted and fatigue
results. When the feeling of fatigue passes away with rest, the muscle
recovers its power. While we are resting, the blood is pouring in fresh
supplies of building material.

  Experiment 19. _To show how muscles relax and contract_. Lay your
  left forearm on a table; grasp with the right hand the mass of flesh on
  the front of the upper arm. Now gradually raise the forearm, keeping the
  elbow on the table. Note that the muscle thickens as the hand rises.
  This illustrates the contraction of the biceps, and is popularly called
  "trying your muscle" Reverse the act. Keep the elbow in position, bring
  the forearm slowly to the table, and the biceps appears to become softer
  and smaller,--it relaxes.

  Experiment 20. Repeat the same experiment with other muscles. With
  the right hand grasp firmly the extended left forearm. Extend and flex
  the fingers vigorously. Note the effect on the muscles and tendons of
  the forearm. Grasp with the right hand the calf of the extended right
  leg, and vigorously flex the leg, bringing it near to the body. Note the
  contractions and relaxations of the muscles.

70. Arrangement of Muscles. Muscles are not connected directly with
bones. The mass of flesh tapers off towards the ends, where the fibers
pass into white, glistening cords known as tendons. The place at
which a muscle is attached to a bone, generally by means of a tendon, is
called its origin; the end connected with the movable bone is its
insertion.

There are about 400 muscles in the human body, all necessary for its
various movements. They vary greatly in shape and size, according to their
position and use. Some are from one to two feet long, others only a
fraction of an inch. Some are long and spindle-shaped, others thin and
broad, while still others form rings. Thus some of the muscles of the arm
and thigh are long and tapering, while the abdominal muscles are thin and
broad because they help form walls for cavities. Again, the muscular
fibers which surround and by their contraction close certain orifices, as
those of the eyelids and lips, often radiate like the spokes of a wheel.

Muscles are named according to their shape, position, division of origin
or insertion, and their function. Thus we have the _recti_ (straight), and
the _deltoid_ (Δ, delta), the _brachial_ (arm), _pectoral_
(breast), and the _intercostals_ (between the ribs), so named from their
position. Again, we have the _biceps_ (two-headed), _triceps_
(three-headed), and many others with similar names, so called from the
points of origin and insertion. We find other groups named after their
special use. The muscles which bend the limbs are called _flexors_ while
those which straighten them are known as _extensors_.

After a bone has been moved by the contraction of a muscle, it is brought
back to its position by the contraction of another muscle on the opposite
side, the former muscle meanwhile being relaxed. Muscles thus acting in
opposition to each other are called antagonistic. Thus the biceps serves
as one of the antagonists to the triceps, and the various flexors and
extensors of the limbs are antagonistic to one another.

71. The Tendons. The muscles which move the bones by their
contraction taper for the most part, as before mentioned, into
tendons. These are commonly very strong cords, like belts or straps,
made up of white, fibrous tissue.

Tendons are most numerous about the larger joints, where they permit free
action and yet occupy but little space. Large and prominent muscles in
these places would be clumsy and inconvenient. If we bend the arm or leg
forcibly, and grasp the inside of the elbow or knee joint, we can feel the
tendons beneath the skin. The numerous tendons in the palm or on the back
of the hand contribute to its marvelous dexterity and flexibility. The
thickest and strongest tendon in the body is the tendon of Achilles,
which connects the great muscles in the calf of the leg with the heel bone
(sec. 49).

When muscles contract forcibly, they pull upon the tendons which transmit
the movement to the bones to which they are attached. Tendons may be
compared to ropes or cords which, when pulled, are made to act upon
distant objects to which one end is fastened. Sometimes the tendon runs
down the middle of a muscle, and the fibers run obliquely into it, the
tendon resembling the quill in a feather. Again, tendons are spread out in
a flat layer on the surface of muscles, in which case they are called
aponeuroses. Sometimes a tendon is found in the middle of a muscle as well
as at each end of it.

[Illustration: Fig. 34.--The Biceps Muscle dissected to show its Tendons.]

72. Synovial Sheaths and Sacs. The rapid movement of the tendons
over bony surfaces and prominences would soon produce an undue amount of
heat and friction unless some means existed to make the motion as easy as
possible. This is supplied by sheaths which form a double lining around
the tendons. The opposed surfaces are lined with synovial
membrane,[11] the secretion from which oils the sheaths in which the
tendons move.

Little closed sacs, called synovial sacs or bursæ, similarly lined
and containing fluid, are also found in special places between two
surfaces where much motion is required. There are two of these bursæ near
the patella, one superficial, just under the skin; the other deep beneath
the bone (Fig. 29). Without these, the constant motion of the knee-pan and
its tendons in walking would produce undue friction and heat and
consequent inflammation. Similar, though smaller, sacs are found over the
point of the elbow, over the knuckles, the ankle bones, and various other
prominent points. These sacs answer a very important purpose, and are
liable to various forms of inflammation.

  Experiment 21. Examine carefully the tendons in the parts dissected
  in Experiment 18. Pull on the muscles and the tendons, and note how they
  act to move the parts. This may be also admirably shown on the leg of a
  fowl or turkey from a kitchen or obtained at the market.

  Obtain the hoof of a calf or sheep with one end of the tendon of
  Achilles still attached. Dissect it and test its strength.

73. Mechanism of Movement. The active agents of bodily movements, as
we have seen, are the muscles, which by their contraction cause the bones
to move one on the other. All these movements, both of motion and of
locomotion, occur according to certain fixed laws of mechanics. The bones,
to which a great proportion of the muscles in the body are attached, act
as distinct levers. The muscles supply the power for moving the
bones, and the joints act as fulcrums or points of support. The weight of
the limb, the weight to be lifted, or the force to overcome, is the
resistance.

74. Levers in the Body. In mechanics three classes of levers are
described, according to the relative position of the power, the fulcrum,
and the resistance. All the movements of the bones can be referred to one
or another of these three classes.

Levers of the first class are those in which the fulcrum is between
the power and the weight. The crowbar, when used to lift a weight at one
end by the application of power at the other, with a block as a fulcrum,
is a familiar example of this class. There are several examples of this in
the human body. The head supported on the atlas is one. The joint between
the atlas and the skull is the fulcrum, the weight of the head is the
resistance. The power is behind, where the muscles from the neck are
attached to the back of the skull. The object of this arrangement is to
keep the head steady and balanced on the spinal column, and to move it
backward and forward.

[Illustration: Fig. 35.--Showing how the Bones of the Arm serve as Levers.

  P, power;
  W, weight;
  F, fulcrum.
]

Levers of the second class are those in which the weight is between
the fulcrum and the power. A familiar example is the crowbar when used for
lifting a weight while one end rests on the ground. This class of levers
is not common in the body. Standing on tiptoe is, however, an example.
Here the toes in contact with the ground are the fulcrum, the power is the
action of the muscles of the calf, and between these is the weight of the
body transmitted down the bones of the leg to the foot.

Levers of the third class are those in which the power is applied at
a point between the fulcrum and weight. A familiar example is where a
workman raises a ladder against a wall. This class of levers is common in
the body. In bending the forearm on the arm, familiarly known as "trying
your muscle," the power is supplied by the biceps muscle attached to the
radius, the fulcrum is the elbow joint at one end of the lever, and the
resistance is the weight of the forearm at the other end.

  Experiment 22. _To illustrate how the muscles use the bones as
  levers._ First, practice with a ruler, blackboard pointer, or any other
  convenient object, illustrating the different kinds of levers until the
  principles are familiar. Next, illustrate these principles on the
  person, by making use of convenient muscles. Thus, lift a book on the
  toes, by the fingers, on the back of the hand, by the mouth, and in
  other ways.

  These experiments, showing how the bones serve as levers, may be
  multiplied and varied as circumstances may require.

75. The Erect Position. The erect position is peculiar to man. No
other animal naturally assumes it or is able to keep it long. It is the
result of a somewhat complex arrangement of muscles which balance each
other, some pulling backwards and some forwards. Although the whole
skeleton is formed with reference to the erect position, yet this attitude
is slowly learned in infancy.

In the erect position the center of gravity lies in the joint between the
sacrum and the last lumbar vertebra. A line dropped from this point would
fall between the feet, just in front of the ankle joints. We rarely stand
with the feet close together, because that basis of support is too small
for a firm position. Hence, in all efforts requiring vigorous muscular
movements the feet are kept more or less apart to enlarge the basis of
support.

Now, on account of the large number and flexibility of the joints, the
body could not be kept in an upright position without the cooperation of
certain groups of muscles. The muscles of the calf of the leg, acting on
the thigh bone, above the knee, keep the body from falling forward, while
another set in front of the thigh helps hold the leg straight. These thigh
muscles also tend to pull the trunk forward, but in turn are balanced by
the powerful muscles of the lower back, which help keep the body straight
and braced.

The head is kept balanced on the neck partly by the central position of
the joint between the atlas and axis, and partly by means of strong
muscles. Thus, the combined action of these and other muscles serves to
balance the body and keep it erect. A blow on the head, or a sudden shock
to the nervous system, causes the body to fall in a heap, because the
brain has for the time lost its power over the muscles, and they cease to
contract.

[Illustration: Fig. 36.--Diagram showing the Action of the Chief Muscles
which keep the Body Erect. (The arrows indicate the direction in which
these muscles act, the feet serving as a fixed basis.) [After Huxley.]

_Muscles which tend to keep the body from falling forward._

  A, muscles of the calf;
  B, of the back of the thigh;
  C, of the spinal column.

_Muscles which tend to keep the body from falling backward._

  D, muscles of the front of the leg;
  E, of the front of the thigh;
  F, of the front of the abdomen;
  G, of the front of the neck.
]

76. Important Muscles. There are scores of tiny muscles about the
head, face, and eyes, which, by their alternate contractions and
relaxations, impart to the countenance those expressions which reflect the
feelings and passions of the individual. Two important muscles, the
temporal, near the temples, and the masseter, or chewing muscle,
are the chief agents in moving the lower jaw. They are very large in the
lion, tiger, and other flesh-eating animals. On the inner side of each
cheek is the buccinator, or trumpeter's muscle, which is largely
developed in those who play on wind instruments. Easily seen and felt
under the skin in thin persons, on turning the head to one side, is the
sterno-cleido-mastoid muscle, which passes obliquely down on each
side of the neck to the collar bone--prominent in sculpture and painting.

The chest is supplied with numerous muscles which move the ribs up and
down in the act of breathing. A great, fan-shaped muscle, called the
pectoralis major, lies on the chest. It extends from the chest to the
arm and helps draw the arm inward and forward. The arm is raised from the
side by a large triangular muscle on the shoulder, the deltoid, so
called from its resemblance to the Greek letter delta, Δ. The
biceps, or two-headed muscle, forms a large part of the fleshy mass
in front of the arm. Its use is to bend the forearm on the arm, an act
familiarly known as "trying your muscle." Its direct antagonist is the
three-headed muscle called the triceps. It forms the fleshy mass on
the back of the arm, its use being to draw the flexed forearm into a right
line.

On the back and outside of the forearm are the extensors, which
straighten the wrist, the hand, and the fingers. On the front and inside
of the forearm are the flexors, which bend the hand, the wrist, and
the fingers. If these muscles are worked vigorously, their tendons can be
readily seen and felt under the skin. At the back of the shoulder a large,
spread-out muscle passes upward from the back to the humerus. From its
wide expanse on the back it is known as the latissimus dorsi
(broadest of the back). When in action it draws the arm downward and
backward, or, if one hangs by the hands, it helps to raise the body. It is
familiarly known as the "climbing muscle."

[Illustration: Fig. 37.--A Few of the Important Muscles of the Back.]

Passing to the lower extremity, the thigh muscles are the largest and the
most powerful in the body. In front a great, four-headed muscle,
quadriceps extensor, unites into a single tendon in which the
knee-cap is set, and serves to straighten the knee, or when rising from a
sitting posture helps elevate the body. On the back of the thigh are
several large muscles which bend the knee, and whose tendons, known as the
"hamstrings," are readily felt just behind the knee. On the back of the
leg the most important muscles, forming what is known as the calf, are the
gastrocnemius and the soleus. The first forms the largest part
of the calf. The soleus, so named from resembling a sole-fish, is a muscle
of broad, flattened shape, lying beneath the gastrocnemius. The tendons of
these two muscles unite to form the tendon of Achilles, as that hero
is said to have been invulnerable except at this point. The muscles of the
calf have great power, and are constantly called into use in walking,
cycling, dancing, and leaping.

77. The Effect of Alcoholic Drinks upon the Muscles. It is found that
a man can do more work without alcohol than with it. After taking it there
may be a momentary increase of activity, but this lasts only ten or
fifteen minutes at the most. It is followed by a rapid reduction of power
that more than outweighs the momentary gain, while the quality of the work
is decidedly impaired from the time the alcohol is taken.

Even in the case of hard work that must be speedily done, alcohol does not
help, but hinders its execution. The tired man who does not understand the
effects of alcohol often supposes that it increases his strength, when in
fact it only deadens his sense of fatigue by paralyzing his nerves. When
put to the test he is surprised at his self-deception.

Full intoxication produces, by its peculiar depression of the brain and
nervous system, an artificial and temporary paralysis of the muscles, as
is obvious in the pitifully helpless condition of a man fully intoxicated.
But even partial approach to intoxication involves its proportionate
impairment of nervous integrity, and therefore just so much diminution of
muscular force. All athletes recognize this fact, as while training for a
contest, rigid abstinence is the rule, both from liquors and tobacco. This
muscular weakness is shown also in the unsteady hand, the trembling limbs
of the inebriate, his thick speech, wandering eye, and lolling head.

78. Destructive Effect of Alcoholic Liquors upon Muscular Tissue.
Alcoholic liquors retard the natural chemical changes so essential to good
health, by which is meant the oxidation of the nutritious elements of
food. Careful demonstration has proved also that the amount of carbon
dioxide escaping from the lungs of intoxicated persons is from thirty to
fifty per cent less than normal. This shut-in carbon stifles the nervous
energy, and cuts off the power that controls muscular force. This lost
force is in close ratio to the retained carbon: so much perverted chemical
change, so much loss of muscular power. Not only the strength but the fine
delicacy of muscular action is lost, the power of nice control of the hand
and fingers, as in neat penmanship, or the use of musical instruments.

To this perverted chemical action is also due the fatty degeneration so
common in inebriates, affecting the muscles, the heart, and the liver.
These organs are encroached upon by globules of fat (a hydrocarbon),
which, while very good in their proper place and quantity, become a
source of disorder and even of death when they abnormally invade vital
structures. Other poisons, as phosphorus, produce this fatty decay more
rapidly; but alcohol causes it in a much more general way.

This is proved by the microscope, which plainly shows the condition
mentioned, and the difference between the healthy tissues and those thus
diseased.

[Illustration: Fig. 38.--Principal Muscles on the Left Side of Neck.

  A, buccinator;
  B, masseter;
  C, depressor anguli oris;
  D, anterior portion of the digastric;
  E, mylo-hyoid;
  F, tendon of the digastric;
  G, sterno-hyoid;
  H, sterno-thyroid;
  K, omo-hyoid;
  L, sternal origin of sterno-cleido-mastoid muscle;
  M, superior fibers of deltoid;
  N, posterior scalenus;
  O, clavicular origin of sterno-cleido-mastoid;
  P, sterno-cleido-mastoid;
  R, trapezius;
  S, anterior constrictor;
  T, splenius capitis;
  V, stylo-hyoid;
  W, posterior portion of the digastric;
  X, fasciculi of ear muscles;
  Z, occipital.
]

    [NOTE. It was proposed during the Civil War to give each soldier in a
    certain army one gill of whiskey a day, because of great hardship and
    exposure. The eminent surgeon, Dr. Frank H. Hamilton of New York, thus
    expressed his views of the question: "It is earnestly desired that no
    such experiment will ever be repeated in the armies of the United
    States. In our own mind, the conviction is established, by the
    experience and observation of a life, that the regular routine
    employment of alcoholic stimulants by man in health is never, under
    any circumstances, useful. We make no exceptions in favor of cold or
    heat or rain."

    "It seems to me to follow from these Arctic experiences that the
    regular use of spirits, even in moderation, under conditions of great
    physical hardship, continued and exhausting labor, or exposure to
    severe cold cannot be too strongly deprecated."

    A. W. Greely, retired Brigadier General, U.S.A., and formerly leader
    of the Greely Expedition.]

79. Effect of Tobacco on the Muscles. That other prominent narcotic,
tobacco, impairs the energy of the muscles somewhat as alcohol does, by
its paralyzing effect upon the nervous system. As all muscular action
depends on the integrity of the nervous system, whatever lays its
deadening hand upon that, saps the vigor and growth of the entire frame,
dwarfs the body, and retards mental development. This applies especially
to the young, in the growing age between twelve or fourteen and twenty,
the very time when the healthy body is being well knit and compacted.

Hence many public schools, as well as our national naval and military
academies, rigidly prohibit the use of tobacco by their pupils. So also
young men in athletic training are strictly forbidden to use it.[12] This
loss of muscular vigor is shown by the unsteady condition of the muscles,
the trembling hand, and the inability to do with precision and accuracy
any fine work, as in drawing or nice penmanship.



Additional Experiments.

  Experiment 23. _ To examine the minute structure of voluntary
  muscular fiber._ Tease, with two needles set in small handles, a bit of
  raw, lean meat, on a slip of glass, in a little water. Continue until
  the pieces are almost invisible to the naked eye.

  Experiment 24. Place a clean, dry cover-glass of about the width of
  the slip, over the water containing the torn fragments. Absorb the
  excess of moisture at the edge of the cover, by pressing a bit of
  blotting-paper against it for a moment. Place it on the stage of a
  microscope and examine with highest obtainable power, by light reflected
  upward from the mirror beneath the stage. Note the apparent size of the
  finest fibers; the striation of the fibers, or their markings,
  consisting of alternate dim and bright cross bands. Note the arrangement
  of the fibers in bundles, each thread running parallel with its
  neighbor.

  Experiment 25. _To examine the minute structure of involuntary
  muscular fiber, a tendon, or a ligament._ Obtain a very small portion of
  the muscular coat of a cow's or a pig's stomach. Put it to soak in a
  solution of one dram of bichromate of potash in a pint of water. Take
  out a morsel on the slip of glass, and tease as directed for the
  voluntary muscle. Examine with a high power of the microscope and note:
  (1) the isolated cells, long and spindle-shaped, that they are much
  flattened; (2) the arrangement of the cells, or fibers, in sheets, or
  layers, from the torn ends of which they project like palisades.

  Experiment 26. Tease out a small portion of the tendon or ligament
  in water, and examine with a glass of high power. Note the large fibers
  in the ligament, which branch and interlace.

  Experiment 27. With the head slightly bent forwards, grasp between
  the fingers of the right hand the edge of the left
  sterno-cleido-mastoid, just above the collar bone. Raise the head and
  turn it from left to right, and the action of this important muscle is
  readily seen and felt. In some persons it stands out in bold relief.

  Experiment 28. The tendons which bound the space (popliteal) behind
  the knee can be distinctly felt when the muscles which bend the knee are
  in action. On the outer side note the tendons of the biceps of the leg,
  running down to the head of the fibula. On the inside we feel three
  tendons of important muscles on the back of the thigh which flex the leg
  upon the thigh.

  Experiment 29. _To show the ligamentous action of the muscles._
  Standing with the back fixed against a wall to steady the pelvis, the
  knee can be flexed so as to almost touch the abdomen. Take the same
  position and keep the knee rigid. When the heel has been but slightly
  raised a sharp pain in the back of the thigh follows any effort to carry
  it higher. Flexion of the leg to a right angle, increases the distance
  from the lines of insertion on the pelvic bones to the tuberosities of
  the tibia by two or three inches--an amount of stretching these muscle
  cannot undergo. Hence the knee must be flexed in flexion of the hip.

  Experiment 30. A similar experiment may be tried at the wrist. Flex
  the wrist with the fingers extended, and again with the fingers in the
  fist. The first movement can be carried to 90°, the second only to 30°,
  or in some persons up to 60°. Making a fist had already stretched the
  extensor muscles of the arm, and they can be stretched but little
  farther. Hence, needless pain will be avoided by working a stiff wrist
  with the parts loose, or the fingers extended, and not with a clenched
  fist.


                 Review Analysis: Important Muscles.

  Location.
            Name.                   Chief Function.


  Head and Neck.

    Occipito-frontalis.      moves scalp and raises eye brow.
    Orbicularis palpebrarum. shuts the eyes.
    Levator palpebrarum.     opens the eyes.
    Temporal.                raise the lower jaw.
    Masseter.                  "    "    "    "
    Sterno-cleido-mastoid.   depresses head upon neck and neck upon chest.
    Platysma myoides.        depresses lower jaw and lower lip.


  Trunk.

    Pectoralis major.        draws arm across front of chest.
    Pectoralis minor.        depresses point of shoulder,
    Latissimus dorsi.        draws arm downwards and backwards.
    Serratus magnus.         assists in raising ribs.
    Trapezius. Rhomboideus.  backward movements of head and shoulder,
    Intercostals.            raise and depress the ribs.
    External oblique.       /various forward movements
    Internal oblique.       \  of trunk
    Rectus abdominis.        compresses abdominal viscera and acts upon
                               pelvis.

  Upper Limbs.

    Deltoid.                 carries arm outwards and upwards.
    Biceps.                  flexes elbow and raises arm.
    Triceps.                 extends the forearm.
    Brachialis anticus.      flexor of elbow.
    Supinator longus.        flexes the forearm.
    Flexor carpi radialis.   flexors of wrist.
    Flexor carpi ulnaris.       "    "    "


  Lower Limbs.

    Gluteus maximus.         adducts the thigh.
    Adductors of thigh.      draw the leg inwards.
    Sartorius.               crosses the legs.
    Rectus femoris.          flexes the thigh.
    Vastus externus.         extensor of leg.
    Vastus internus.         extensor of leg upon thigh.
    Biceps femoris.          flexes leg upon thigh.
    Gracilis.                flexes the leg and adducts thigh.
    Tibialis anticus.        draws up inner border of foot.
    Peroneus longus.         raises outer edge of foot,
    Gastrocnemius.           keep the body erect, and
    Soleus.                  aid in walking and running.




Chapter IV.

Physical Exercise.



80. Importance of Bodily Exercise. Nothing is so essential to success
in life as sound physical health. It enables us to work with energy and
comfort, and better to endure unusual physical and mental strains. While
others suffer the penalties of feebleness, a lower standard of functional
activities, and premature decay, the fortunate possessor of a sound mind
in a sound body is better prepared, with proper application, to endure the
hardships and win the triumphs of life[13].

This element of physical capacity is as necessary to a useful and
energetic life, as are mental endowment and intellectual acquirement.
Instinct impels us to seek health and pleasure in muscular exercise. A
healthy and vigorous child is never still except during sleep. The
restless limbs and muscles of school children pent up for several hours,
feel the need of movement, as a hungry man craves food. This natural
desire for exercise, although too often overlooked, is really one of the
necessities of life. One must be in ill health or of an imperfect nature,
when he ceases to feel this impulse. Indeed, motion within proper bounds
is essential to the full development and perfect maintenance of the bodily
health. Unlike other machines, the human body becomes within reasonable
limits, stronger and more capable the more it is used.

As our tenure of life at best is short, it is our duty to strive to live
as free as possible from bodily ills. It is, therefore, of paramount
importance to rightly exercise every part of the body, and this without
undue effort or injurious strain.

Strictly speaking, physical exercise refers to the functional
activity of each and every tissue, and properly includes the regulation of
the functions and movements of the entire body. The word exercise,
however, is used usually in a narrower sense as applied to those movements
that are effected by the contraction of the voluntary muscles.

Brief reference will be made in this chapter only to such natural and
systematic physical training as should enter into the life of every
healthy person.

81. Muscular Activity. The body, as we have learned, is built up of
certain elementary tissues which are combined to make bones, muscles,
nerves, and other structures. The tissues, in turn, are made up of
countless minute cells, each of which has its birth, lives its brief
moment to do its work in the animal economy, is separated from the tissue
of which it was a part, and is in due time eliminated by the organs of
excretion,--the lungs, the skin, or the kidneys. Thus there is a
continuous process of growth, of decay, and removal, among the individual
cells of each tissue.

    [NOTE. The Incessant Changes in Muscular Tissue. "In every tiny
    block of muscle there is a part which is really alive, there are parts
    which are becoming alive, there are parts which have been alive, and
    are now dying or dead; there is an upward rush from the lifeless to
    the living, a downward rush from the living to the dead. This is
    always going on, whether the muscle be quiet and at rest, or whether
    it be active and moving,--some of the capital of living material is
    being spent, changed into dead waste; some of the new food is always
    being raised into living capital. But when the muscle is called upon
    to do work, when it is put into movement, the expenditure is
    quickened, there is a run upon the living capital, the greater, the
    more urgent the call for action."--Professor Michael Foster.]

These ceaseless processes are greatly modified by the activity of the
bodily functions. Every movement of a muscle, for instance, involves
change in its component cells. And since the loss of every atom of the
body is in direct relation to its activity, a second process is necessary
to repair this constant waste; else the body would rapidly diminish in
size and strength, and life itself would soon end. This process of repair
is accomplished, as we shall learn in Chapters VI. and VII., by the organs
of nutrition, which convert the food into blood.

[Illustration: Fig. 39.--Showing how the Muscles of the Back may be
developed by a Moderate Amount of Dumb-Bell Exercise at Home. (From a
photograph.)]

82. Effect of Exercise upon the Muscles. Systematic exercise
influences the growth and structure of the muscles of the body in a manner
somewhat remarkable. Muscular exercise makes muscular tissue; from the
lack of it, muscles become soft and wasted. Muscles properly exercised not
only increase in size, both as a whole and in their individual structure,
but are better enabled to get rid of material which tends to hamper their
movements. Thus muscular exercise helps to remove any needless
accumulation of fat, as well as useless waste matters, which may exist in
the tissues. As fat forms no permanent structural part of the organism,
its removal is, within limits, effected with no inconvenience.

Muscular strength provides the joints with more powerful ligaments and
better developed bony parts. After long confinement to the bed from
disease, the joints have wasted ligaments, thin cartilages, and the bones
are of smaller proportions. Duly exercised muscles influence the size of
the bones upon which they act. Thus the bones of a well-developed man are
stronger, firmer, and larger than those of a feeble person.

He who has been physically well trained, has both a more complete and a
more intelligent use of his muscles. He has acquired the art of causing
his muscles to act in concert. Movements once difficult are now carried on
with ease. The power of coördination is increased, so that a desired end
is attained with the least amount of physical force and nervous energy. In
learning to row, play baseball, ride the bicycle, or in any other
exercises, the beginner makes his movements in a stiff and awkward manner.
He will use and waste more muscular force in playing one game of ball, or
in riding a mile on his wheel, than an expert would in doing ten times the
work. He has not yet learned to balance one set of muscles against their
antagonists.

[Illustration: Fig. 40.--The Standard Special Chest Weight.

A convenient machine by means of which all the muscles of the body may be
easily and pleasantly exercised with sufficient variations in the
movements to relieve it of monotony.

A space 6 ft wide, 6 ft deep, and 7 ft high nearly in front of the machine
is required for exercise.]

In time, however, acts which were first done only with effort and by a
conscious will, become automatic. The will ceases to concern itself. By
what is called reflex action, memory is developed in the spinal cord and
the muscular centers (sec. 273). There is thus a great saving of actual
brain work, and one important cause of fatigue is removed.

83. Effect of Exercise on Important Organs. The importance of
regular exercise is best understood by noting its effects upon the
principal organs of the body. As the action of the heart is increased both
in force and frequency during exercise, the flow of blood throughout the
body is augmented. This results from the force of the muscular
contractions which play their part in pressing the blood in the veins
onward towards the heart. Exercise also induces a more vigorous
respiration, and under increased breathing efforts the lung capacity is
increased and the size of the chest is enlarged. The amount of air
inspired and expired in a given time is much larger than if the body were
at rest. The blood is thus supplied with a much larger amount of oxygen
from the air inhaled, and gives off to the air a corresponding excess of
carbon dioxid and water.

Again, exercise stimulates and strengthens the organs of digestion. The
appetite is improved, as is especially noted after exercise in the open
air. The digestion is more complete, absorption becomes more rapid, the
peristaltic movements of the bowels are promoted, and the circulation
through the liver is more vigorous. More food is taken to supply the force
necessary for the maintenance of the mechanical movements. Ample exercise
also checks the tendency towards a torpid circulation in the larger
digestive organs, as the stomach and the liver, so common with those who
eat heartily, but lead sedentary lives. In short, exercise may be regarded
as a great regulator of nutrition.

Exercise increases the flow of blood through the small vessels of the
skin, and thus increases the radiation of heat from the surface. If the
exercise be vigorous and the weather hot, a profuse sweat ensues, the
rapid evaporation of which cools the body. The skin is thus a most
important regulator of the bodily temperature, and prevents any rise above
the normal which would otherwise result from vigorous exercise. (See secs.
226 and 241).

84. Effect of Exercise upon the Personal Appearance. Judicious and
systematic exercise, if moderately employed, soon gives a more upright and
symmetrical figure, and an easier and more graceful carriage. Rounded
shoulders become square, the awkward gait disappears, and there is seen a
graceful poise to the head and a bearing of the body which mark those
whose muscles have been well trained. A perfectly formed skeleton and
well-developed muscles give the graceful contour and perfect outline to
the human body. The lean, soft limbs of those who have never had any
physical education, often look as if they belonged to persons recovering
from sickness. The effects of sound physical exercise are well exhibited
in the aspect of the neck, shoulders, and chest of one who has been well
trained. This is noticeable in gymnasts and others who practice upon the
horizontal bar, with chest weights, dumb-bells, and other apparatus which
develop more especially the muscles of the upper half of the trunk.

[Illustration: Fig. 41.--Young Woman practicing at Home with the "Whitely
Exerciser." (From a photograph)]

Exercise improves the condition of the tissues generally. They become more
elastic, and in all respects sounder. The skin becomes firm, clear, and
wholesome. Hence, every part of the surface of the body rapidly takes on a
change in contour, and soon assumes that appearance of vigor and soundness
which marks those of firm physical condition. The delicate, ruddy aspect
of the complexion, the swing about the body and the bearing of the head
and shoulders, of young women whose physical training has been efficient,
are in marked contrast with those characteristics in persons whose
education in this respect has been neglected.

85. Effect of Unsuitable or Excessive Exercise. But exercise, like
everything else which contributes to our welfare, may be carried to
excess. The words excessive and unsuitable, when applied to muscular
exertion, are relative terms, and apply to the individual rather than to
amount of work done. Thus what may be excessive for one person, might be
suitable and beneficial to another. Then the condition of the individual,
rather than the character of the muscular work, is always a most important
factor.

Breathlessness is, perhaps, the most common effect of undue exertion. Let
a middle-aged person, who is out of practice, run a certain distance, and
he is soon troubled with his breathing. The respirations become irregular,
and there is a sense of oppression in his chest. He pants, and his
strength gives out. His chest, and not his legs, has failed him. He is
said to be "out of breath." He might have practiced dumb-bells or rowed
for some time without inconvenience.

The heart is often overstrained, and at times has been ruptured during
violent exertion, as in lifting an immense weight. The various forms of
heart-disease are common with those whose occupations involve severe
muscular effort, as professional athletes and oarsmen. Hæmorrhages of
various kinds, especially from the lungs, or rupture of blood-vessels in
the brain, are not uncommon results of over-exertion.

Excessive repetition of muscular movements may lead to permanent
contractions of the parts involved. Thus sailors, mechanics, and others
frequently develop a rigidity of the tendons of the hand which prevents
the full extension of the fingers. So stenographers, telegraphers and
writers occasionally suffer from permanent contractions of certain muscles
of the arm, known as writer's cramp, due to their excessive use. But the
accidents which now and then may result from severe physical exertion,
should discourage no one from securing the benefits which accrue from
moderate and reasonable exercise.

86. Muscular Fatigue. We all know how tiresome it is to hold the arm
outstretched horizontally even for a few moments. A single muscle, the
deltoid, in this case does most of the work. Even in a vigorous man, this
muscle can act no longer than four to six minutes before the arm drops
helpless. We may prolong the period by a strong effort of the will, but a
time soon comes when by no possible effort are we able to hold out the
arm. The muscle is said to be fatigued. It has by no means lost its
contractile power, for if we apply a strong electric stimulus to it, the
fatigue seems to disappear. Thus we see the functional power of a muscle
has a definite limit, and in fatigue that limit is reached.

[Illustration: Fig. 42.--A Well-Equipped Gymnasium. (From a photograph.)]

The strength of the muscle, its physical condition, the work it has done,
and the mental condition of the individual, all modify the state of
fatigue. In those difficult acts which involve a special effort of the
will, the matter of nerve exhaustion is largely concerned. Thus, the
incessant movements in St. Vitus' dance result in comparatively little
fatigue, because there is no association of the brain with the muscular
action. If a strong man should attempt to perform voluntarily the same
movements, he would soon have to rest. None of the movements which are
performed independently of the will, as the heart-beats and breathing
movements, ever involve the sensation of fatigue. As a result of fatigue
the normal irritability of muscular tissue becomes weakened, and its force
of contraction is lessened. There is, also, often noticed in fatigue a
peculiar tremor of the muscles, rendering their movements uncertain. The
stiffness of the muscles which comes on during severe exercise, or the day
after, are familiar results of fatigue.

This sense of fatigue should put us on guard against danger. It is a kind
of regulator which serves in the ordinary actions of life to warn us not
to exceed the limits of useful exercise. Fatigue summons us to rest long
before all the force of the motor organs has been expended, just as the
sensation of hunger warns us that we need food, long before the body has
become weak from the lack of nourishment.

We should never forget that it is highly essential to maintain an unused
reserve of power, just as a cautious merchant always keeps at the bank an
unexpended balance of money. If he overspends his money he is bankrupt,
and the person who overspends his strength is for the time physically
bankrupt. In each case the process of recovery is slow and painful.

87. Rest for the Muscles. Rest is necessary for the tissues, that
they may repair the losses sustained by work; that is, a period of rest
must alternate with a period of activity. Even the heart, beating
ceaselessly, has its periods of absolute rest to alternate with those of
work. A steam-engine is always slowly, but surely, losing its fitness for
work. At last it stops from the need of repair. Unlike the engine, the
body is constantly renewing itself and undergoing continual repair. Were
it not for this power to repair and renew its various tissues, the body
would soon be worn out.

This repair is really a renovation of the structure. Rest and work are
relative terms, directly opposed to each other. Work quickens the pulse
and the respiration, while rest slows both. During sleep the voluntary
muscles are relaxed, and those of organic life work with less energy. The
pulse and the respiration are less frequent, and the temperature lower
than when awake. Hence sleep, "tired Nature's sweet restorer," may be
regarded as a complete rest.

The periods of rest should vary with the kind of exercise. Thus exercise
which produces breathlessness requires frequent but short rests. The
trained runner, finding his respiration embarrassed, stops a moment to
regain his breath. Exercises of endurance cause fatigue less quickly than
those of speed, but require longer rest. Thus a man not used to long
distances may walk a number of hours without stopping, but while fatigue
is slow to result, it is also slow to disappear. Hence a lengthy period of
rest is necessary before he is able to renew his journey.

88. Amount of Physical Exercise Required. The amount of physical
exercise that can be safely performed by each person, is a most important
and practical question. No rule can be laid down, for what one person
bears well, may prove very injurious to another. To a certain extent, each
must be guided by his own judgment. If, after taking exercise, we feel
fatigued and irritable, are subject to headache and sleeplessness, or find
it difficult to apply the mind to its work, it is plain that we have been
taxing our strength unduly, and the warnings should be heeded.

Age is an important factor in the problem, as a young man may do with
ease and safety, what might be injurious to an older person. In youth,
when the body is making its most active development, the judicious use of
games, sports, and gymnastics is most beneficial. In advanced life, both
the power and the inclination for exercise fail, but even then effort
should be made to take a certain reasonable amount of exercise.

Abundant evidence shows that physical development is most active from
thirteen to seventeen years of age; this manifests itself clearly by
increase in weight. Hence this period of life is of great consequence. If
at this age a boy or girl is subjected to undue physical strain, the
development may suffer, the growth be retarded, and the foundation laid
for future ill health.

[Illustration: Fig. 43.--Student exercising in the School Gymnasium on the
Rowing Machine. (From a photograph.)]

The proper amount of exercise must vary greatly with circumstances. It may
be laid down as a fairly safe rule, that a person of average height and
weight, engaged in study or in any indoor or sedentary occupation, should
take an amount of exercise equivalent to walking five or six miles a day.
Growing children, as a rule, take more exercise than this, while most men
working indoors take far less, and many women take less exercise than men.
Exercise may be varied in many ways, the more the better; but for the most
part it should always be taken in the open air.

89. Time for Exercise. It is not prudent to do hard work or take
severe exercise, just before or just after a full meal. The best time is
one or two hours after a meal. Vigorous exercise while the stomach is
busily digesting food, may prove injurious, and is apt to result sooner or
later in dyspepsia. On the other hand, severe exercise should not be taken
on an empty stomach. Those who do much work or study before breakfast,
should first take a light lunch, just enough to prevent any faint feeling.
With this precaution, there is no better time for moderate exercise than
the early morning.

In the case of children, physical exercises should not be undertaken when
they are overtired or hungry. Neither is it judicious for adults to take
vigorous exercise in the evening, after a long and arduous day's work.

90. Walking, Running, and Jumping. Walking is generally regarded as
the simplest and most convenient mode of taking exercise. Man is
essentially a walking animal. When taken with a special object in view, it
is the best and most pleasant of all physical activities. It is suited for
individuals of all ages and occupations, and for residents of every
climate. The child, the athlete, and the aged are all able to indulge in
this simple and effective means of keeping the body in health.

In walking, the muscles of the entire body are brought into action,
and the movements of breathing and the circulation of the blood are
increased. The body should be erect, the chest thrown out, the head and
shoulders held back, and the stride long and elastic. It is an excellent
custom to add to the usefulness of this fine exercise, by deep, voluntary
inhalations of pure air.

Running is an excellent exercise for children and young people, but
should be sparingly indulged in after the age of thirty-five. If it be
accompanied with a feeling of faintness, breathlessness, and palpitation
of the heart, the exercise is too severe, and its continuance may do
serious harm. Running as an exercise is beneficial to those who have kept
themselves in practice and in sound condition. It brings into play nearly
every muscle of the body, and thus serves to develop the power of
endurance, as well as strength and capacity for rapid movement.

Jumping may well be left to boys and young men under twenty, but
skipping with a rope, allied to jumping, is an admirable and beneficial
form of exercise. It brings into action many muscles without putting undue
strain upon any particular group.

91. Skating, Swimming, and Rowing. Skating is a delightful and
invigorating exercise. It calls into play a great variety of muscles, and
is admirably adapted for almost all ages. It strengthens the ankles and
helps give an easy and graceful carriage to the body. Skating is
especially valuable, as it can be enjoyed when other out-door exercises
are not convenient.

Every child above ten years of age should be taught to swim. The art,
once mastered, is never forgotten. It calls into use a wide combination of
muscles. This accomplishment, so easily learned, should be a part of our
education, as well as baseball or bicycling, as it may chance to any one
to save his own life or that of a companion.

In many respects rowing is one of the most perfect exercises at our
command. It expands the chest, strengthens the body, and gives tone to the
muscles of the abdomen. It is very suitable for girls and women, as no
other exercise is so well adapted to remedy the muscular defects so marked
in their sex. Even elderly persons can row day after day without
difficulty. The degree of muscular effort required, can be regulated so
that those with weak hearts and weak lungs can adjust themselves to the
exercise.

92. Bicycling as an Exercise. The bicycle as a means of taking
exercise has come into popular use with remarkable rapidity. Sharp
competition bids fair to make the wheel more popular and less expensive
than ever. Its phenomenal use by persons of all ages and in all stations
of life, is proof of the enthusiasm with which this athletic exercise is
employed by women as well as by men.

Mechanical skill has removed most of the risks to health and person which
once existed. A good machine, used by its owner with judgment, is the most
convenient, the safest, and the least expensive means of traveling for
pleasure or exercise. It is doing more than any other form of exercise to
improve the bodily condition of thousands whose occupations confine them
all day to sedentary work. Dependent upon no one but himself, the cyclist
has his means of exercise always at hand. No preparation is necessary to
take a spin of ten miles or so on the road, during a summer evening or
before breakfast.

Bicycling brings into active use the muscles of the legs as well as those
of the trunk and arms. It seems to benefit those who suffer from
dyspepsia, constipation, and functional disorders of the liver.

A special caution must be used against overdoing in cycling, for the
temptation by rivalry, making a record, by social competition on the road,
is stronger in this form of exercise than in any other, especially for
young folks. Many cases have occurred of permanent injury, and even loss
of life, from collapse simply by excessive exertion and exhaustion.

93. Outdoor Games and Physical Education. While outdoor games
are not necessary to maintain health, yet we can scarcely overestimate the
part that the great games of baseball, football, tennis, golf, and
croquet, play in the physical development of young people. When played in
moderation and under suitable conditions, they are most useful and
beneficial exercises. They are played in the open air, and demand a great
variety of vigorous muscular movement, with a considerable amount of skill
and adroitness of action. These games not only involve healthful exercise,
but develop all those manly and wholesome qualities so essential to
success in life.

A vigorous body is well-nigh essential to success, but equally important
are readiness of action, sound judgment, good temper, personal courage, a
sense of fair play, and above all, a spirit of honor. Outdoor games, when
played in a reasonable and honorable manner, are most efficient and
practical means to develop these qualities in young people.


94. The School and Physical Education. The advantages to be derived,
during the school period, from the proper care and development of the
body, should be understood and appreciated by school officials, teachers,
and parents. The school period is the best time to shape the lives of
pupils, not mentally or morally alone, but physically as well. This is the
time, by the use of a few daily exercises at school, to draw back the
rounding shoulders, to form the habit of sitting and standing erect, to
build up strong and comely arms and chests, and otherwise to train pupils
to those methods which will serve to ripen them into vigorous and
well-knit men and women.

Teachers can by a little effort gain the knowledge requisite properly to
instruct their pupils in a few systematic exercises. Gratifying results
will follow just as the teacher and pupils evince interest and judgment in
the work. It is found by experience that pupils are not only quick to
learn, but look forward eagerly to the physical exercises as an
interesting change from the routine of school life.

There should be a stated time for these school exercises, as for any other
duty. There can be practiced in the schoolroom a great variety of
interesting and useful exercises, which call for little or no expense for
apparatus. Such exercises should no more interfere with the children's
usual games than any other study does. Under no circumstances should the
play hours be curtailed.

95. Physical Exercises in School. Physical exercises of some sort,
then, should be provided for pupils in our schools, especially in large
towns and cities, where there is little opportunity for outdoor games, and
they should form a part of the regular course of study. The object should
be the promotion of sound health rather than the development of muscle, or
performing feats of agility or strength. Exercises with dumb-bells and
wands, or even without any apparatus, practiced a few times a day, for
five minutes at a time, do a great deal of good. They relax the tension of
body and mind, and introduce an element of pleasure into the routine of
school life. They increase the breathing power and quicken the action of
the heart.

[Illustration: Fig. 44.--Physical Exercises as carried on in Schools.
(From photographs.)]

    [NOTE. "In early boyhood and youth nothing can replace the active
    sports so much enjoyed at this period; and while no needless
    restrictions should be placed upon them, consideration should be paid
    to the amount, and especially to the character, of the games pursued
    by delicate youth. For these it would be better to develop the
    weakened parts by means of systematic physical exercises and by
    lighter sports."--Dr. John M. Keating on "Physical Development" in
    Pepper's _Cyclopædia of the Diseases of Children_.]

If vigorously and systematically carried out, these exercises invigorate
all the tissues and organs of the body, and stimulate them to renewed
activity. They serve to offset the lack of proper ventilation, faulty
positions at the desks, and the prolonged inaction of the muscles. To
secure the greatest benefit from physical training in school, it is
important that the pupils be interested in these exercises, and consider
them a recreation, and not a task[14].

96. Practical Points about Physical Exercise. The main object in
undertaking systematic and graduated physical exercises is not to learn to
do mere feats of strength and skill, but the better to fit the individual
for the duties and the work of life. Exercises should be considered with
reference to their availability from the learner's standpoint. The most
beneficial exercises ordinarily are the gentle ones, in which no strain is
put upon the heart and the respiration. The special aim is to secure the
equal use of all the muscles, not the development of a few. The
performance of feats of strength should never come within the scope of any
educational scheme. Exercises which call for sustained effort, violent
exertion, or sudden strain are best avoided by those who have had no
preparation or training.

Regular exercise, not sudden and occasional prolonged exertion, is
necessary for health. The man or woman who works in an office or store all
the week, and on Sunday or a holiday indulges in a long spin on the
bicycle, often receives more harm than good from the exertion. Exercise
should be taken, so far as is convenient, in the open air, or in a large
and well-ventilated room.[15]

After the more violent exercises, as baseball, football, a long ride on
the bicycle, or even after a prolonged walk, a warm bath should be taken
at the first convenient opportunity. Care should be taken to rub down
thoroughly, and to change a part or all of the clothing. Exercise is
comparatively valueless until the idea of taking it for health is quite
forgotten in the interest and pleasure excited by the occasion. No
exercise should be carried to such a degree as to cause fatigue or
exhaustion. Keep warmly clad after exercise, avoid chills, and always stop
exercising as soon as fatigue is felt.

Wear clothing which allows free play to all the muscles of the body. The
clothing should be light, loose, and made of wool. Care should be taken
not to take cold by standing about in clothes which are damp with
perspiration. In brisk walking and climbing hills keep the mouth shut,
especially in cold weather, and breathe through the nose, regulating the
pace so that it can be done without discomfort.


97. Effect of Alcoholic Liquors and Tobacco upon Physical Culture. As
a result of the unusual attention given to physical culture in the last
few years, hundreds of special instructors are now employed in training
young people in the theory and practice of physical exercise. These expert
teachers, to do their work with thoroughness and discipline, recognize the
necessity of looking after the daily living of their students. The time of
rising and retiring, the hours of sleep, the dress, the care of the diet,
and many other details of personal health become an important part of the
training.

Recognizing the fact that alcoholic drink and tobacco are so disastrous to
efficiency in any system of physical training, these instructors rigidly
forbid the use of these drugs under all circumstances. While this
principle is perhaps more rigorously enforced in training for athletic
contests, it applies equally to those who have in view only the
maintenance of health.

Books on Physical Education. There are many excellent books on
physical education, which are easily obtained for reading or for
reference. Among these one of the most useful and suggestive is Blackie's
well-known book, "How to Get Strong and how to Stay so." This little book
is full of kindly advice and practical suggestions to those who may wish
to begin to practice health exercises at home with inexpensive apparatus.
For more advanced work, Lagrange's "Physiology of Bodily Exercise" and the
Introduction to Maclaren's "Physical Education" may be consulted. A
notable article on "Physical Training" by Joseph H. Sears, an Ex-Captain
of the Harvard Football Team, may be found in Roosevelt's "In Sickness and
in Health."

Price lists and catalogues of all kinds of gymnastic apparatus are easily
obtained on application to firms handling such goods.

Various Systems of Physical Exercises. The recent revival of popular
interest in physical education has done much to call the attention of the
public to the usefulness and importance of a more thorough and systematic
use of physical exercises, both at home and in the schools. It is not
within the scope of this book to describe the various systems of gymnastic
and calisthenic exercises now in common use in this country. For the most
part they have been modified and rearranged from other sources, notably
from the two great systems, i.e., Swedish and German.

For a most comprehensive work on the Swedish system, the teacher is
referred to the "Swedish System of Educational Gymnastics," with 264
illustrations, by Baron Nils Posse. There is also a small manual for
teachers, called "Handbook of School Gymnastics of the Swedish Systems,"
by the same author.




Chapter V.

Food and Drink.



98. Why we need Food. The body is often compared to a steam-engine in
good working order. An engine uses up fuel and water to obtain from them
the energy necessary to do its work. So, we consume within our bodies
certain nutritious substances to obtain from them the energy necessary for
our activities. Just as the energy for the working of the engine is
obtained from steam by the combustion of fuel, so the energy possessed by
our bodies results from the combustion or oxidation within us of the food
we eat. Unless this energy is provided for the body it will have but
little power of doing work, and like an engine without steam, must soon
become motionless.


99. Waste and Repair. A steam-engine from the first stroke of its
piston-rod begins to wear out, and before long needs repair. All work
involves waste. The engine, unless kept in thorough repair, would soon
stop. So with our bodies. In their living cells chemical changes are
constantly going on; energy, on the whole, is running down; complex
substances are being broken up into simpler combinations. So long as life
lasts, food must be brought to the tissues, and waste products carried
away from them. It is impossible to move a single muscle, or even to think
for one moment, without some minute part of the muscular or brain tissue
becoming of no further use in the body. The transformation of dead matter
into living tissue is the ever-present miracle which life presents even in
its lowest forms.

In childhood the waste is small, and the amount of food taken is more
than sufficient to repair the loss. Some of the extra food is used in
building up the body, especially the muscles. As we shall learn in Chapter
VIII., food is also required to maintain the bodily heat. Food, then,
is necessary for the production of energy, for the repair of the body, for
the building up of the tissues, and for the maintenance of bodily heat.


100. Nature of the Waste Material. An ordinarily healthy person
passes daily, on an average, by the kidneys about 50 ounces of waste
material, of which 96 per cent is water, and from the intestines, on an
average, 5½ ounces, a large proportion of which is water. By the skin,
in the shape of sweat and insensible perspiration, there is cast out about
23 ounces, of which 99 per cent is water; and by the lungs about 34
ounces, 10 of which are water and the remainder carbon dioxid.

Now if we omit an estimate of the undigestible remains of the food, we
find that the main bulk of what daily leaves the body consists of water,
carbon dioxid, and certain solid matters contained in solution in
the renal secretion and the sweat. The chief of these solid matters is
urea, a complex product made up of four elements,--carbon, hydrogen,
oxygen, and nitrogen. Water contains only two elements, hydrogen and
oxygen; and carbon dioxid also has only two, carbon and oxygen. Hence,
what we daily cast out of our bodies consists essentially of these four
elements in the form mainly of water, carbon dioxid, and urea.

These waste products represent the oxidation that has taken place in
the tissues in producing the energy necessary for the bodily activities,
just as the smoke, ashes, clinkers, and steam represent the consumption of
fuel and water in the engine. Plainly, therefore, if we could restore to
the body a supply of these four elements equivalent to that cast out, we
could make up for the waste. The object of food, then, is to restore to
the body an amount of the four elements equal to that consumed. In other
words, and briefly: The purpose of food is to supply the waste of the
tissues and to maintain the normal composition of the blood.

101. Classification of Foods. Foods may be conveniently divided into
four great classes, to which the name food-stuffs or alimentary
principles has been given. They correspond to the chief "proximate
principles" of which the body consists. To one or the other of these
classes all available foods belong[16]. The classification of food-stuffs
usually given is as follows:

    I. Proteids, or Nitrogenous Foods.
   II. Starches and Sugars, or Carbohydrates.
  III. Fats and Oils.
   IV. Inorganic or Mineral Foods,--Water, Salt.

102. Proteids; or Nitrogenous Foods. The proteids, frequently
spoken of as the nitrogenous foods, are rich in one or more of the
following organic substances: albumen, casein, fibrin, gelatine, myosin,
gluten, and legumin.

The type of this class of foods is albumen, well known as the white of an
egg. The serum of the blood is very rich in albumen, as is lean meat. The
curd of milk consists mainly of casein. Fibrin exists largely in blood and
flesh foods. Gelatine is obtained from the animal parts of bones and
connective tissue by prolonged boiling. One of the chief constituents of
muscular fiber is myosin. Gluten exists largely in the cereals wheat,
barley, oats, and rye. The proteid principle of peas and beans is legumin,
a substance resembling casein.

As the name implies, the proteids, or nitrogenous foods, contain nitrogen;
carbohydrates and fats, on the contrary, do not contain nitrogen. The
principal proteid food-stuffs are milk, eggs, flesh foods of all kinds,
fish, and the cereals among vegetable foods. Peas and beans are rich in
proteids. The essential use of the proteids to the tissues is to supply
the material from which the new proteid tissue is made or the old proteid
tissue is repaired. They are also valuable as sources of energy to the
body. Now, as the proteid part of its molecule is the most important
constituent of living matter, it is evident that proteid food is an
absolute necessity. If our diet contained no proteids, the tissues of
the body would gradually waste away, and death from starvation would
result. All the food-stuffs are necessary in one way or another to the
preservation of perfect health, but proteids, together with a certain
proportion of water and inorganic salts, are absolutely necessary for the
bare maintenance of animal life--that is, for the formation and
preservation of living protoplasm.

103. Starches and Sugars. The starches, sugars, and gums, also known
as carbohydrates, enter largely into the composition of foods of
vegetable origin. They contain no nitrogen, but the three elements,
carbon, hydrogen, and oxygen, the last two in the same proportion as in
water. The starches are widely distributed throughout the vegetable
kingdom. They are abundant in potatoes and the cereals, and in arrowroot,
rice, sago, and tapioca. Starch probably stands first in importance among
the various vegetable foods.

The sugars are also widely distributed substances, and include the
cane, grape, malt, maple, and milk sugars. Here also belong the gums and
cellulose found in fruit, cereals, and all vegetables which form the
basis of the plant cells and fibers. Honey, molasses, and manna are
included in this class.

The physiological value of the starches and sugars lies in the fact that
they are oxidized in the body, and a certain amount of energy is thereby
liberated. The energy of muscular work and of the heat of the body comes
largely from the oxidation, or destruction, of this class of foods. Now,
inasmuch as we are continually giving off energy from the body, chiefly in
the form of muscular work and heat, it is evident that material for the
production of this energy must be taken in the food. The carbohydrates
constitute the bulk of our ordinary food.

104. Fats and Oils. These include not only the ordinary fats of
meat, but many animal and vegetable oils. They are alike in
chemical composition, consisting of carbon and hydrogen, with a little
oxygen and no nitrogen. The principal kinds of fat used as food are the
fat of meat, butter, suet, and lard; but in many parts of the world
various vegetable oils are largely used, as the olive, palm, cotton seed,
cocoanut, and almond.

The use of the fats in the body is essentially the same as that of the
starches and sugars. Weight for weight they are more valuable than the
carbohydrates as sources of energy, but the latter are more easily
digested, and more easily oxidized in the body. An important use of fatty
foods is for the maintenance of the bodily heat. The inhabitants of Arctic
regions are thus enabled, by large use of the fat and oil from the animals
they devour, to endure safely the severe cold. Then there is reason to
believe that fat helps the digestion of other foods, for it is found that
the body is better nourished when the fats are used as food. When more fat
is consumed than is required to keep up the bodily heat and to yield
working power, the excess is stored up in various parts of the body,
making a sort of reserve fuel, which may be drawn upon at any future time.

105. Saline or Mineral Foods. All food contains, besides the
substances having potential energy, as described, certain saline
matters. Water and salts are not usually considered foods, but the results
of scientific research, as well as the experience of life, show that these
substances are absolutely necessary to the body. The principal mineral
foods are salt, lime, iron, magnesia, phosphorus, potash, and water.
Except common salt and water, these substances are usually taken only in
combination with other foods.

These saline matters are essential to health, and when not present in due
proportion nutrition is disturbed. If a dog be fed on food freed from all
salines, but otherwise containing proper nutrients, he soon suffers from
weakness, after a time amounting to paralysis, and often dies in
convulsions.

About 200 grains of common salt are required daily by an adult, but a
large proportion of this is in our food. Phosphate of lime is obtained
from milk and meats, and carbonate of lime from the hard water we drink.
Both are required for the bones and teeth. The salts of potash, which
assist in purifying the blood, are obtained from vegetables and fruits. An
iron salt is found in most foods, and sulphur in the yolk of eggs.

106. Water. Water is of use chiefly as a solvent, and while not
strictly a food, is necessary to life. It enters into the construction of
every tissue and is constantly being removed from the body by every
channel of waste[17].

As a solvent water aids digestion, and as it forms about 80 per cent
of the blood, it serves as a carrier of nutrient material to all the
tissues of the body.



Important Articles of Diet.


107. Milk. The value of milk as a food cannot be overestimated.
It affords nourishment in a very simple, convenient, and perfect form. It
is the sole food provided for the young of all animals which nourish their
young. It is an ideal food containing, in excellent proportions, all the
four elements necessary for growth and health in earlier youth.

[Table: Composition of Food Materials. Careful analyses have been
made of the different articles of food, mostly of the raw, or uncooked
foods. As might be expected, the analyses on record differ more or less in
the percentages assigned to the various constituents, but the following
table will give a fair idea of the fundamental nutritive value of the more
common foods:


  In 100 parts    Water   Proteid   Fat      Carbohydrate       Ash
                                         Digestible Cellulose
  Meat            76.7    20.8      1.5      0.3      --        1.3
  Eggs            73.7    12.6     12.1      --       --        1.1
  Cheese          36-60   25-33    7-30      3-7      --        3.4
  Cow's Milk      87.7     3.4      3.2      4.8      --        0.7
  Wheat Flour     13.3    10.2      0.9     74.8      0.3       0.5
  Wheat Bread     35.6     7.1      0.2     55.5      0.3       1.1
  Rye Flour       13.7    11.5      2.1     69.7      1.6       1.4
  Rye bread       42.3     6.1      0.4     49.2      0.5       1.5
  Rice            13.1     7.0      0.9     77.4      0.6       1.0
  Corn            13.1     9.9      4.6     68.4      2.5       1.5
  Macaroni        10.1     9.0      0.3     79.0      0.3       0.5
  Peas and Beans  12-15   23-26    1½-2     49-54     4.7       2-3
  Potatoes        75.5     2.0      0.2     20.6      0.7       1.0
  Carrots         87.1     1.0      0.2      9.3      1.4       0.9
  Cabbage         90       2.3      0.5      4-6      1-2       1.3
  Fruit           84       0.5      --      10        4         0.5
]

Cheese is the nitrogenous part of milk, which has been coagulated by the
use of rennet. The curd is then carefully dried, salted, and pressed.
Cheese is sometimes difficult of digestion, as on account of its solid
form it is not easily acted upon by the digestive fluids.

108. Meats. The flesh of animals is one of our main sources of food.
Containing a large amount of proteid, it is admirably adapted for building
up and repairing the tissues of the body. The proportion of water is also
high, varying from 50 to 75 per cent. The most common meats used in
this country are beef, mutton, veal, pork, poultry, and game.

Beef contains less fat and is more nutritious than either mutton or pork.
Mutton has a fine flavor and is easily digested. Veal and lamb, though
more tender, are less easily digested. Pork contains much fat, and its
fiber is hard, so that it is the most difficult to digest of all the
meats. Poultry and game have usually a small proportion of fat, but are
rich in phosphates and are valued for their flavor.

109. Eggs. Consisting of about two-thirds water and the rest albumen
and fat, eggs are often spoken of as typical natural food. The white
of an egg is chiefly albumen, with traces of fat and salt; the yolk is
largely fat and salts. The yellow color is due partly to sulphur. It is
this which blackens a silver spoon. Eggs furnish a convenient and
concentrated food, and if properly cooked are readily digested.

110. Fish. Fish forms an important and a most nutritious article of
diet, as it contains almost as much nourishment as butcher's meat. The
fish-eating races and classes are remarkably strong and healthy. Fish
is less stimulating than meat, and is thus valuable as a food for invalids
and dyspeptics. To be at its best, fish should be eaten in its season. As
a rule shell-fish, except oysters, are not very digestible. Some persons
are unable to eat certain kinds of fish, especially shell-fish, without
eruptions on the skin and other symptoms of mild poisoning.

111. Vegetable Foods. This is a large and important group of foods,
and embraces a remarkable number of different kinds of diet. Vegetable
foods include the cereals, garden vegetables, the fruits, and other less
important articles. These foods supply a certain quantity of albumen and
fat, but their chief use is to furnish starches, sugars, acids, and salts.
The vegetable foods indirectly supply the body with a large amount of
water, which they absorb in cooking.

112. Proteid Vegetable Foods. The most important proteid vegetable
foods are those derived from the grains of cereals and certain
leguminous seeds, as peas and beans. The grains when ground make the
various flours or meals. They contain a large quantity of starch, a
proteid substance peculiar to them called gluten, and mineral salts,
especially phosphate of lime. Peas and beans contain a smaller proportion
of starch, but more proteid matter, called legumin, or vegetable casein.
Of the cereal foods, wheat is that most generally useful. Wheat, and corn
and oatmeal form most important articles of diet. Wheat flour has starch,
sugar, and gluten--nearly everything to support life except fat.

Oatmeal is rich in proteids. In some countries, as Scotland, it forms an
important article of diet, in the form of porridge or oatmeal cakes.

Corn meal is not only rich in nitrogen, but the proportion of fat is also
large; hence it is a most important and nutritious article of food. Rice,
on the other hand, contains less proteids than any other cereal grain, and
is the least nutritious. Where used as a staple article of food, as in
India, it is commonly mixed with milk, cheese, or other nutritious
substances. Peas and beans, distinguished from all other vegetables by
their large amount of proteids--excel in this respect even beef, mutton,
and fish. They take the place of meats with those who believe in a
vegetable diet.

113. Non-proteid Vegetable Foods. The common potato is the best type
of non-proteid vegetable food. When properly cooked it is easily
digested and makes an excellent food. It contains about 75 per cent of
water, about 20 per cent of carbohydrates, chiefly starch, 2 per cent of
proteids, and a little fat and saline matters. But being deficient in
flesh-forming materials, it is unfit for an exclusive food, but is best
used with milk, meat, and other foods richer in proteid substances. Sweet
potatoes, of late years extensively used as food, are rich in starch and
sugar. Arrowroot, sago, tapioca, and similar foods are nutritious, and
easily digested, and with milk furnish excellent articles of diet,
especially for invalids and children.

Explanation of the Graphic Chart. The graphic chart, on the next
page, presents in a succinct and easily understood form the composition of
food materials as they are bought in the market, including the edible and
non-edible portions. It has been condensed from Dr. W. O. Atwater's
valuable monograph on "Foods and Diet." This work is known as the Yearbook
of the U.S. Department of Agriculture for 1894.

KEY: 1, percentage of nutrients; 2, fuel value of 1 pound in calories. The
unit of heat, called a _calorie_, or gramme-degree, is the amount of heat
which is necessary to raise one gramme (15.43 grains) of water one degree
centigrade (1.8° Fahr.). A, round beef; B, sirloin beef; C, rib beef; D,
leg of mutton; E, spare rib of pork; F, salt pork; G, smoked ham; H, fresh
codfish; I, oysters; J, milk; K, butter; L, cheese; M, eggs; N, wheat
bread; O, corn meal; P, oatmeal; Q, dried beans; R, rice; S, potatoes; T,
sugar.

This table, among other things, shows that the flesh of fish contains more
water than that of warm-blooded animals. It may also be seen that animal
foods contain the most water; and vegetable foods, except potatoes, the
most nutrients. Proteids and fats exist only in small proportions in most
vegetables, except beans and oatmeal. Vegetable foods are rich in
carbohydrates while meats contain none. The fatter the meat the less the
amount of water. Thus very lean meat may be almost four-fifths water, and
fat pork almost one-tenth water.

[Illustration: Fig. 45.--Graphic Chart of the Composition of Food
Materials. Composition of Food Materials. Nutritive ingredients, refuse,
and fuel value. ]

114. Non-proteid Animal Foods. Butter is one of the most digestible
of animal fats, agreeable and delicate in flavor, and is on this account
much used as a wholesome food. Various substitutes have recently come into
use. These are all made from animal fat, chiefly that of beef, and are
known as butterine, oleomargarine, and by other trade names. These
preparations, if properly made, are wholesome, and may be useful
substitutes for butter, from which they differ but little in composition.

115. Garden Vegetables. Various green, fresh, and succulent
vegetables form an essential part of our diet. They are of importance
not so much on account of their nutritious elements, which are usually
small, as for the salts they supply, especially the salts of potash. It is
a well-known fact that the continued use of a diet from which fresh
vegetables are excluded leads to a disease known as scurvy. They are also
used for the agreeable flavor possessed by many, and the pleasant variety
and relish they give to the food. The undigested residue left by all green
vegetables affords a useful stimulus to intestinal contraction, and tends
to promote the regular action of the bowels.

116. Fruits. A great variety of fruits, both fresh and dry, is
used as food, or as luxuries. They are of little nutritive value,
containing, as they do, much water and only a small amount of proteid, but
are of use chiefly for the sugar, vegetable acids, and salts they contain.

In moderate quantity, fruits are a useful addition to our regular diet.
They are cooling and refreshing, of agreeable flavor, and tend to prevent
constipation. Their flavor and juiciness serve to stimulate a weak
appetite and to give variety to an otherwise heavy diet. If eaten in
excess, especially in an unripe or an overripe state, fruits may occasion
a disturbance of the stomach and bowels, often of a severe form.

117. Condiments. The refinements of cookery as well as the craving
of the appetite, demand many articles which cannot be classed strictly as
foods. They are called condiments, and as such may be used in
moderation. They give flavor and relish to food, excite appetite and
promote digestion. Condiments increase the pleasure of eating, and by
their stimulating properties promote secretions of the digestive fluids
and excite the muscular contractions of the alimentary canal.

The well-known condiments are salt, vinegar, pepper, ginger, nutmeg,
cloves, and various substances containing ethereal oils and aromatics.
Their excessive use is calculated to excite irritation and disorder of the
digestive organs.

118. Salt The most important and extensively used of the condiments
is common salt. It exists in all ordinary articles of diet, but in
quantities not sufficient to meet the wants of the bodily tissues. Hence
it is added to many articles of food. It improves their flavor, promotes
certain digestive secretions, and meets the nutritive demands of the body.
The use of salt seems based upon an instinctive demand of the system for
something necessary for the full performance of its functions. Food
without salt, however nutritious in other respects, is taken with
reluctance and digested with difficulty.

Salt has always played an important and picturesque part in the history of
dietetics. Reference to its worth and necessity abounds in sacred and
profane history. In ancient times, salt was the first thing placed on the
table and the last removed. The place at the long table, above or below
the salt, indicated rank. It was everywhere the emblem of hospitality. In
parts of Africa it is so scarce that it is worth its weight in gold, and
is actually used as money. Torture was inflicted upon prisoners of state
in olden times by limiting the food to water and bread, without salt. So
intense may this craving for salt become, that men have often risked their
liberty and even their lives to obtain it.

119. Water. The most important natural beverage is pure water; in
fact it is the only one required. Man has, however, from the earliest
times preferred and daily used a variety of artificial drinks, among which
are tea, coffee, and cocoa.

All beverages except certain strong alcoholic liquors, consist almost
entirely of water. It is a large element of solid foods, and our
bodies are made up to a great extent of water. Everything taken into the
circulating fluids of the body, or eliminated from them, is done through
the agency of water. As a solvent it is indispensable in all the
activities of the body.

It has been estimated that an average-sized adult loses by means of the
lungs, skin, and kidneys about eighty ounces of water every twenty-four
hours. To restore this loss about four pints must be taken daily. About
one pint of this is obtained from the food we eat, the remaining three
pints being taken as drink. One of the best ways of supplying water to the
body is by drinking it in its pure state, when its solvent properties can
be completely utilized. The amount of water consumed depends largely upon
the amount of work performed by the body, and upon the temperature.

Being one of the essential elements of the body, it is highly important
that water should be free from harmful impurities. If it contain the germs
of disease, sickness may follow its use. Without doubt the most important
factor in the spread of disease is, with the exception of impure air,
impure water. The chief agent in the spread of typhoid fever is
impure water. So with cholera, the evidence is overwhelming that filthy
water is an all-powerful agent in the spread of this terrible disease.

120. Tea, Coffee, and Cocoa. The active principle of tea is called
theine; that of coffee, caffeine, and of cocoa, theobromine. They also
contain an aromatic, volatile oil, to which they owe their distinctive
flavor. Tea and coffee also contain an astringent called tannin, which
gives the peculiar bitter taste to the infusions when steeped too long. In
cocoa, the fat known as cocoa butter amounts to fifty per cent.

121. Tea. It has been estimated that one-half of the human race now
use tea, either habitually or occasionally. Its use is a prolific source
of indigestion, palpitation of the heart, persistent wakefulness, and of
other disorders. When used at all it should be only in moderation. Persons
who cannot use it without feeling its hurtful effects, should leave it
alone. It should not be taken on an empty stomach, nor sipped after every
mouthful of food.

122. Coffee. Coffee often disturbs the rhythm of the heart and causes
palpitation. Taken at night, coffee often causes wakefulness. This effect
is so well known that it is often employed to prevent sleep. Immoderate
use of strong coffee may produce other toxic effects, such as muscular
tremors, nervous anxiety, sick-headache, palpitation, and various
uncomfortable feelings in the cardiac region. Some persons cannot drink
even a small amount of tea or coffee without these unpleasant effects.
These favorite beverages are unsuitable for young people.

123. Cocoa. The beverage known as cocoa comes from the seeds of the
cocoa-tree, which are roasted like the coffee berries to develop the
aroma. Chocolate is manufactured cocoa,--sugar and flavors being added to
the prepared seeds. Chocolate is a convenient and palatable form of highly
nutritious food. For those with whom tea and coffee disagree, it may be an
agreeable beverage. The large quantity of fat which it contains, however,
often causes it to be somewhat indigestible.

124. Alcoholic Beverages. There is a class of liquids which are
certainly not properly food or drink, but being so commonly used as
beverages, they seem to require special notice in this chapter. In view
of the great variety of alcoholic beverages, the prevalence of their
use, and the very remarkable deleterious effects they produce upon the
bodily organism, they imperatively demand our most careful attention, both
from a physiological and an hygienic point of view.

125. Nature of Alcohol. The ceaseless action of minute forms of plant
life, in bringing about the decomposition of the elaborated products of
organized plant or animal structures, will be described in more detail
(secs. 394-398).

All such work of vegetable organisms, whether going on in the moulding
cheese, in the souring of milk, in putrefying meat, in rotting fruit, or
in decomposing fruit juice, is essentially one of fermentation,
caused by these minute forms of plant life. There are many kinds of
fermentation, each with its own special form of minute plant life or
micro-organism.

In this section we are more especially concerned about that fermentation
which results from the decomposition of sweet fruit, plant, or other
vegetable, juices which are composed largely of water containing sugar and
flavoring matters.

This special form of fermentation is known as alcoholic or vinous
fermentation, and the micro-organisms that cause it are familiarly termed
alcoholic ferments. The botanist classes them as _Saccharomycetes_, of
which there are several varieties. Germs of _Saccharomycetes_ are found on
the surfaces and stems of fruit as it is ripening. While the fruit remains
whole these germs have no power to invade the juice, and even when the
skins are broken the conditions are less favorable for their work than for
that of the moulds,[18] which are the cause of the rotting of fruit.

But when fruit is crushed and its juice pressed out, the
_Saccharomycetes_ are carried into it where they cannot get the oxygen
they need from the air. They are then able to obtain oxygen by taking it
from the sugar of the juice. By so doing they cause a breaking up of the
sugar and a rearrangement of its elements. Two new substances are formed
in this decomposition of sugar, viz., carbon dioxid, which arises
from the liquid in tiny bubbles, and alcohol, a poison which
remains in the fermenting fluid.

Now we must remember that fermentation entirely changes the nature of the
substance fermented. For all forms of decomposition this one law holds
good. Before alcoholic fermentation, the fruit juice was wholesome and
beneficial; after fermentation, it becomes, by the action of the minute
germs, a poisonous liquid known as alcohol, and which forms an essential
part of all intoxicating beverages.

Taking advantage of this great law of fermentation which dominates the
realm of nature, man has devised means to manufacture various alcoholic
beverages from a great variety of plant structures, as ripe grapes, pears,
apples, and other fruits, cane juices, corn, the malt of barley, rye,
wheat, and other cereals.

The process differs according to the substance used and the manner in
which it is treated, but the ultimate outcome is always the same,
viz., the manufacture of a beverage containing a greater or less
proportion of alcoholic poison. By the process of _distillation_, new and
stronger liquor is made. Beverages thus distilled are known as ardent
spirits. Brandy is distilled from wine, rum from fermented molasses, and
commercial alcohol mostly from whiskey.

The poisonous element in all forms of intoxicating drinks, and the one so
fraught with danger to the bodily tissues, is the alcohol they
contain. The proportion of the alcoholic ingredient varies, being about 50
per cent in brandy, whiskey, and rum, about 20 to 15 per cent in wines,
down to 5 per cent, or less, in the various beers and cider; but whether
the proportion of alcohol be more or less, the same element of danger is
always present.

126. Effects of Alcoholic Beverages upon the Human System. One of the
most common alcoholic beverages is wine, made from the juice of grapes. As
the juice flows from the crushed fruit the ferments are washed from the
skins and stems into the vat. Here they bud and multiply rapidly,
producing alcohol. In a few hours the juice that was sweet and wholesome
while in the grape is changed to a poisonous liquid, capable of injuring
whoever drinks it. One of the gravest dangers of wine-drinking is the
power which the alcohol in it has to create a thirst which demands more
alcohol. The spread of alcoholism in wine-making countries is an
illustration of this fact.

Another alcoholic beverage, common in apple-growing districts, is cider.
Until the microscope revealed the ferment germ on the "bloom" of the
apple-skin, very little was known of the changes produced in cider during
the mysterious process of "working." Now, when we see the bubbles of gas
in the glass of cider we know what has produced them, and we know too that
a poison which we do not see is there also in corresponding amounts. We
have learned, too, to trace the wrecked hopes of many a farmer's family to
the alcohol in the cider which he provided so freely, supposing it
harmless.

Beer and other malt liquors are made from grain. By sprouting the grain,
which changes its starch to sugar, and then dissolving out the sugar with
water, a sweet liquid is obtained which is fermented with yeast, one kind
of alcoholic ferment. Some kinds of beer contain only a small percentage
of alcohol, but these are usually drunk in proportionately large amounts.
The life insurance company finds the beer drinker a precarious risk; the
surgeon finds him an unpromising subject; the criminal court finds him
conspicuous in its proceedings. The united testimony from all these
sources is that beer is demoralizing, mentally, morally, and physically.

127. Cooking. The process through which nearly all food used by
civilized man has to pass before it is eaten is known as cooking.
Very few articles indeed are consumed in their natural state, the
exceptions being eggs, milk, oysters, fruit and a few vegetables. Man is
the only animal that cooks his food. Although there are savage races that
have no knowledge of cooking, civilized man invariably cooks most of his
food. It seems to be true that as nations advance in civilization they
make a proportionate advance in the art of cooking.

Cooking answers most important purposes in connection with our food,
especially from its influence upon health. It enables food to be more
readily chewed, and more easily digested. Thus, a piece of meat when raw
is tough and tenacious, but if cooked the fibers lose much of their
toughness, while the connective tissues are changed into a soft and
jelly-like mass. Besides, the meat is much more readily masticated and
acted upon by the digestive fluids. So cooking makes vegetables and grains
softer, loosens their structure, and enables the digestive juices readily
to penetrate their substance.

Cooking also improves or develops flavors in food, especially in animal
foods, and thus makes them attractive and pleasant to the palate. The
appearance of uncooked meat, for example, is repulsive to our taste, but
by the process of cooking, agreeable flavors are developed which stimulate
the appetite and the flow of digestive fluids.

Another important use of cooking is that it kills any minute parasites or
germs in the raw food. The safeguard of cooking thus effectually removes
some important causes of disease. The warmth that cooking imparts to food
is a matter of no slight importance; for warm food is more readily
digested, and therefore nourishes the body more quickly.

The art of cooking plays a very important part in the matter of health,
and thus of comfort and happiness. Badly cooked and ill-assorted foods are
often the cause of serious disorders. Mere cooking is not enough, but good
cooking is essential.



Experiments.


Experiments with the Proteids.

Experiment 31. As a type of the group of proteids we take the white
of egg, egg-white or egg-albumen. Break an egg carefully, so as not to mix
the white with the yolk. Drop about half a teaspoonful of the raw white of
egg into half a pint of distilled water. Beat the mixture vigorously with
a glass rod until it froths freely. Filter through several folds of muslin
until a fairly clear solution is obtained.

Experiment 32. To a small quantity of this solution in a test tube
add strong nitric acid, and boil. Note the formation of a white
precipitate, which turns yellow. After cooling, add ammonia, and note that
the precipitate becomes orange.

Experiment 33. Add to the solution of egg-albumen, excess of strong
solution of caustic soda (or potash), and then a drop or two of very
dilute solution (one per cent) of copper sulphate. A violet color is
obtained which deepens on boiling.

Experiment 34. Boil a small portion of the albumen solution in a test
tube, adding drop by drop dilute acetic acid (two per cent) until a flaky
coagulum of insoluble albumen separates.


Experiments with Starch.

Experiment 35. Wash a potato and peel it. Grate it on a nutmeg grater
into a tall cylindrical glass full of water. Allow the suspended particles
to subside, and after a time note the deposit. The lowest layer consists
of a white powder, or starch, and above it lie coarser fragments of
cellulose and other matters.

Experiment 36. Examine under the microscope a bit of the above white
deposit. Note that each starch granule shows an eccentric hilum with
concentric markings. Add a few drops of very dilute solution of iodine.
Each granule becomes blue, while the markings become more distinct.

Experiment 37. Examine a few of the many varieties of other kinds of
starch granules, as in rice, arrowroot, etc. Press some dry starch powder
between the thumb and forefinger, and note the peculiar crepitation.

Experiment 38. Rub a few bits of starch in a little cold water. Put a
little of the mixture in a large test tube, and then fill with boiling
water. Boil until an imperfect opalescent solution is obtained.

Experiment 39. Add powdered dry starch to cold water. It is
insoluble. Filter and test the filtrate with iodine. It gives no blue
color.

Experiment 40. Boil a little starch with water; if there is enough
starch it sets on cooling and a paste results.

Experiment 41. Moisten some flour with water until it forms a tough,
tenacious dough; tie it in a piece of cotton cloth, and knead it in a
vessel containing water until all the starch is separated. There remains
on the cloth a grayish white, sticky, elastic "gluten," made up of
albumen, some of the ash, and fats. Draw out some of the gluten into
threads, and observe its tenacious character.

Experiment 42. Shake up a little flour with ether in a test tube,
with a tight-fitting cork. Allow the mixture to stand for an hour, shaking
it from time to time. Filter off the ether, and place some of it on a
perfectly clean watch glass. Allow the ether to evaporate, when a greasy
stain will be left, thus showing the presence of fats in the flour.

Experiment 43. Secure a specimen of the various kinds of flour, and
meal, peas, beans, rice, tapioca, potato, etc. Boil a small quantity of
each in a test tube for some minutes. Put a bit of each thus cooked on a
white plate, and pour on it two or three drops of the tincture of iodine.
Note the various changes of color,--blue, greenish, orange, or yellowish.


Experiments with Milk.

Experiment 44. Use fresh cow's milk. Examine the naked-eye character
of the milk. Test its reaction with litmus paper. It is usually neutral or
slightly alkaline.

Experiment 45. Examine with the microscope a drop of milk, noting
numerous small, highly refractive oil globules floating in a fluid.

Experiment 46. Dilute one ounce of milk with ten times its volume of
water. Add cautiously dilute acetic acid until there is a copious,
granular-looking precipitate of the chief proteid of milk (caseinogen),
formerly regarded as a derived albumen. This action is hastened by
heating.

Experiment 47. Saturate milk with Epsom salts, or common salt. The
proteid and fat separate, rise to the surface, and leave a clear fluid
beneath.

Experiment 48. Place some milk in a basin; heat it to about 100° F.,
and add a few drops of acetic acid. The mass curdles and separates into a
solid curd (proteid and fat) and a clear fluid (the whey), which contains
the lactose.

Experiment 49. Take one or two teaspoonfuls of fresh milk in a test
tube; heat it, and add a small quantity of extract of rennet. Note that
the whole mass curdles in a few minutes, so that the tube can be inverted
without the curd falling out. Soon the curd shrinks, and squeezes out a
clear, slightly yellowish fluid, the whey.

Experiment 50. Boil the milk as before, and allow it to cool; then
add rennet. No coagulation will probably take place. It is more difficult
to coagulate boiled milk with rennet than unboiled milk.

Experiment 51. Test fresh milk with red litmus paper; it should turn
the paper pale blue, showing that it is slightly alkaline. Place aside for
a day or two, and then test with blue litmus paper; it will be found to be
acid. This is due to the fact that lactose undergoes the lactic acid
fermentation. The lactose is converted into lactic acid by means of a
special ferment.

Experiment 52. Evaporate a small quantity of milk to dryness in an
open dish. After the dry residue is obtained, continue to apply heat;
observe that it chars and gives off pungent gases. Raise the temperature
until it is red hot; allow the dish then to cool; a fine white ash will be
left behind. This represents the _inorganic matter_ of the milk.


Experiments with the Sugars.

Experiment 53. Cane sugar is familiar as cooking and table sugar. The
little white grains found with raisins are grape sugar, or glucose. Milk
sugar is readily obtained of the druggist. Prepare a solution of the
various sugars by dissolving a small quantity of each in water. Heat each
solution with sulphuric acid, and it is seen to darken or char slowly.

Experiment 54. Place some Fehling solution (which can be readily
obtained at the drug store as a solution, or tablets may be bought which
answer the same purpose) in a test tube, and boil. If no yellow
discoloration takes place, it is in good condition. Add a few drops of the
grape sugar solution and boil, when the mixture suddenly turns to an
opaque yellow or red color.

Experiment 55. Repeat same experiment with milk sugar.




Chapter VI.

Digestion.



128. The Purpose of Digestion. As we have learned, our bodies are
subject to continual waste, due both to the wear and tear of their
substance, and to the consumption of material for the production of their
heat and energy. The waste occurs in no one part alone, but in all the
tissues.

Now, the blood comes into direct contact with every one of these tissues.
The ultimate cells which form the tissues are constantly being bathed by
the myriads of minute blood-vessels which bring to the cells the raw
material needed for their continued renewal. These cells are able to
select from the nutritive fluid whatever they require to repair their
waste, and to provide for their renewed activity. At the same time, the
blood, as it bathes the tissues, sweeps into its current and bears away
the products of waste.

Thus the waste occurs in the tissues and the means of repair are obtained
from the blood. The blood is thus continually being impoverished by having
its nourishment drained away. How, then, is the efficiency of the blood
maintained? The answer is that while the ultimate purpose of the food is
for the repair of the waste, its immediate destination is the blood.[19]

129. Absorption of Food by the Blood. How does the food pass from the
cavity of the stomach and intestinal canal into the blood-vessels? There
are no visible openings which permit communication. It is done by what in
physics is known as _endosmotic_ and _exosmotic_ action. That is, whenever
there are two solutions of different densities, separated only by an
animal membrane, an interchange will take place between them through the
membrane.

To illustrate: in the walls of the stomach and intestines there is a
network of minute vessels filled with blood,--a liquid containing many
substances in solution. The stomach and intestinal canal also contain
liquid food, holding many substances in solution. A membrane, made up of
the extremely thin walls of the blood-vessels and intestines, separates
the liquids. An exchange takes place between the blood and the contents of
the stomach and bowels, by which the dissolved substances of food pass
through the separating membranes into the blood.

[Illustration: Fig. 46.--Cavities of the Mouth, Pharynx, etc. (Section in
the middle line designed to show the mouth in its relations to the nasal
fossæ, the pharynx, and the larynx.)

  A, sphenoidal sinus;
  B, internal orifice of Eustachian tube;
  C, velum palati;
  D, anterior pillar of soft palate;
  E, posterior pillar of soft palate;
  F, tonsil;
  H, lingual portion of the pharynx;
  K, lower portion of the pharynx;
  L, larynx;
  M, section of hyoid bone;
  N, epiglottis;
  O, palatine arch
]

This change, by which food is made ready to pass into the blood,
constitutes food-digestion, and the organs concerned in bringing
about this change in the food are the digestive organs.

130. The General Plan of Digestion. It is evident that the digestive
organs will be simple or complex, according to the amount of change which
is necessary to prepare the food to be taken up by the blood. If the
requisite change is slight, the digestive organs will be few, and their
structure simple. But if the food is varied and complex in composition,
the digestive apparatus will be complex. This condition applies to the
food and the digestion of man.

[Illustration: Fig. 47.--Diagram of the Structure of Secreting Glands.

  A, simple tubular gland;
  B, gland with mouth shut and sac formed;
  C, gland with a coiled tube;
  D, plan of part of a racemose gland
]

The digestive apparatus of the human body consists of the alimentary canal
and tributary organs which, although outside of this canal, communicate
with it by ducts. The alimentary canal consists of the mouth, the pharynx,
the œsophagus, the stomach, and the intestines. Other digestive organs
which are tributary to this canal, and discharge their secretions into it,
are the salivary glands,[20] the liver, and the pancreas.

The digestive process is subdivided into three steps, which take place in
the mouth, in the stomach, and in the intestines.

131. The Mouth. The mouth is the cavity formed by the lips, the
cheeks, the palate, and the tongue. Its bony roof is made up of the upper
jawbone on each side, and the palate bones behind. This is the _hard
palate_, and forms only the front portion of the roof. The continuation of
the roof is called the _soft palate_, and is made up of muscular tissue
covered with mucous membrane.

The mouth continues behind into the throat, the separation between the two
being marked by fleshy pillars which arch up from the sides to form the
soft palate. In the middle of this arch there hangs from its free edge a
little lobe called the uvula. On each side where the pillars begin to
arch is an almond-shaped body known as the tonsil. When we take cold,
one or both of the tonsils may become inflamed, and so swollen as to
obstruct the passage into the throat. The mouth is lined with mucous
membrane, which is continuous with that of the throat, œsophagus,
stomach, and intestines (Fig. 51).

132. Mastication, or Chewing. The first step of the process of
digestion is mastication, the cutting and grinding of the food by the
teeth, effected by the vertical and lateral movements of the lower jaw.
While the food is thus being crushed, it is moved to and fro by the varied
movements of the tongue, that every part of it may be acted upon by the
teeth. The advantage of this is obvious. The more finely the food is
divided, the more easily will the digestive fluids reach every part of it,
and the more thoroughly and speedily will digestion ensue.

The act of chewing is simple and yet important, for if hurriedly or
imperfectly done, the food is in a condition to cause disturbance in the
digestive process. Thorough mastication is a necessary introduction to the
more complicated changes which occur in the later digestion.

133. The Teeth. The teeth are attached to the upper and lower
maxillary bones by roots which sink into the sockets of the jaws. Each
tooth consists of a _crown_, the visible part, and one or more fangs,
buried in the sockets. There are in adults 32 teeth, 16 in each jaw.

Teeth differ in name according to their form and the uses to which they
are specially adapted. Thus, at the front of the jaws, the incisors,
or cutting teeth, number eight, two on each side. They have a single root
and the crown is beveled behind, presenting a chisel-like edge. The
incisors divide the food, and are well developed in rodents, as squirrels,
rats, and beavers.

Next come the canine teeth, or cuspids, two in each jaw, so called
from their resemblance to the teeth of dogs and other flesh-eating
animals. These teeth have single roots, but their crowns are more pointed
than in the incisors. The upper two are often called eye teeth, and the
lower two, stomach teeth. Next behind the canines follow, on each side,
two bicuspids. Their crowns are broad, and they have two roots. The
three hindmost teeth in each jaw are the molars, or grinders. These
are broad teeth with four or five points on each, and usually each molar
has three roots.

The last molars are known as the wisdom teeth, as they do not usually
appear until the person has reached the "years of discretion." All animals
that live on grass, hay, corn, and the cereals generally, have large
grinding teeth, as the horse, ox, sheep, and elephant.

The following table shows the teeth in their order:

        Mo. Bi. Ca. In.     In. Ca. Bi. Mo.

  Upper  3   2   1   2   |   2   1   2   3  = 16
                         |                      } = 32
  Lower  3   2   1   2   |   2   1   2   3  = 16

The vertical line indicates the middle of the jaw, and shows that on each
side of each jaw there are eight teeth.

134. Development of the Teeth. The teeth just described are the
permanent set, which succeeds the temporary or milk teeth.
The latter are twenty in number, ten in each jaw, of which the four in the
middle are incisors. The tooth beyond on each side is an eye tooth, and
the next two on each side are bicuspids, or premolars.

The milk teeth appear during the first and second years, and last until
about the sixth or seventh year, from which time until the twelfth or
thirteenth year, they are gradually pushed out, one by one, by the
permanent teeth. The roots of the milk teeth are much smaller than those
of the second set.

[Illustration: Fig. 48.--Temporary and Permanent Teeth together.

_Temporary teeth:_
  A, central incisors;
  B lateral incisors;
  C, canines;
  D, anterior molars;
  E, posterior molars

_Permanent teeth:_
  F, central incisors;
  H, lateral incisors;
  K, canines;
  L, first bicuspids;
  M, second biscuspids;
  N, first molars
]

The plan of a gradual succession of teeth is a beautiful provision of
nature, permitting the jaws to increase in size, and preserving the
relative position and regularity of the successive teeth.

[Illustration: Fig. 49.--Showing the Principal Organs of the Thorax and
Abdomen _in situ_. (The principal muscles are seen on the left, and
superficial veins on the right.)]

135. Structure of the Teeth. If we should saw a tooth down through
its center we would find in the interior a cavity. This is the pulp
cavity, which is filled with the dental pulp, a delicate substance
richly supplied with nerves and blood-vessels, which enter the tooth by
small openings at the point of the root. The teeth are thus nourished like
other parts of the body. The exposure of the delicate pulp to the air, due
to the decay of the dentine, gives rise to the pain of toothache.

Surrounding the cavity on all sides is the hard substance known as the
dentine, or tooth ivory. Outside the dentine of the root is a
substance closely resembling bone, called cement. In fact, it is true
bone, but lacks the Haversian canals. The root is held in its socket
by a dense fibrous membrane which surrounds the cement as the periosteum
does bone.

[Illustration: Fig. 50.--Section of Face. (Showing the parotid and
submaxillary glands.)]

The crown of the tooth is not covered by cement, but by the hard
enamel, which forms a strong protection for the exposed part. When
the teeth are first "cut," the surface of the enamel is coated with a
delicate membrane which answers to the Scriptural phrase "the skin of the
teeth." This is worn off in adult life.

136. Insalivation. The thorough mixture of the saliva with the food
is called insalivation. While the food is being chewed, it is
moistened with a fluid called saliva, which flows into the mouth from
six little glands. There are on each side of the mouth three salivary
glands, which secrete the saliva from the blood. The parotid is
situated on the side of the face in front of the ear. The disease, common
in childhood, during which this gland becomes inflamed and swollen, is
known as the "mumps." The submaxillary gland is placed below and to
the inner side of the lower jaw, and the sublingual is on the floor
of the mouth, between the tongue and the gums. Each gland opens into the
mouth by a little duct. These glands somewhat resemble a bunch of grapes
with a tube for a stalk.

The saliva is a colorless liquid without taste or smell. Its
principal element, besides water, is a ferment called _ptyalin_, which has
the remarkable property of being able to change starch into a form of
cane-sugar, known as maltose.

Thus, while the food is being chewed, another process is going on by which
starch is changed into sugar. The saliva also moistens the food into a
mass for swallowing, and aids in speech by keeping the mouth moist.

The activity of the salivary glands is largely regulated by their abundant
supply of nerves. Thus, the saliva flows into the mouth, even at the
sight, smell, or thought of food. This is popularly known as "making the
mouth water." The flow of saliva may be checked by nervous influences, as
sudden terror and undue anxiety.

  Experiment 56. _To show the action of saliva on starch_. Saliva for
  experiment may be obtained by chewing a piece of India rubber and
  collecting the saliva in a test tube. Observe that it is colorless and
  either transparent or translucent, and when poured from one vessel to
  another is glairy and more or less adhesive. Its reaction is alkaline to
  litmus paper.

  Experiment 57. Make a thin paste from pure starch or arrowroot.
  Dilute a little of the saliva with five volumes of water, and filter it.
  This is best done through a filter perforated at its apex by a pin-hole.
  In this way all air-bubbles are avoided. Label three test tubes _A, B_,
  and _C_. In _A_, place starch paste; in _B_, saliva; and in _C_ one
  volume of saliva and three volumes of starch paste. Place them for ten
  minutes in a water bath at about 104° Fahrenheit.

  Test portions of all three for a reducing sugar, by means of Fehling's
  solution or tablets.[21] _A_ and _B_ give no evidence of sugar, while
  _C_ reduces the Fehling, giving a yellow or red deposit of cuprous
  oxide. Therefore, starch is converted into a reducing sugar by the
  saliva. This is done by the ferment ptyalin contained in saliva.

137. The Pharynx and Œsophagus. The dilated upper part of the
alimentary canal is called the pharynx. It forms a blind sac above
the level of the mouth. The mouth opens directly into the pharynx, and
just above it are two openings leading into the posterior passages of the
nose. There are also little openings, one on each side, from which begin
the Eustachian tubes, which lead upward to the ear cavities.

The windpipe opens downward from the pharynx, but this communication can
be shut off by a little plate or lid of cartilage, the epiglottis.
During the act of swallowing, this closes down over the entrance to the
windpipe, like a lid, and prevents the food from passing into the
air-passages. This tiny trap-door can be seen, by the aid of a mirror, if
we open the mouth wide and press down the back of the tongue with the
handle of a spoon (Figs. 46, 84, and 85).

Thus, there are six openings from the pharynx; the œsophagus being
the direct continuation from it to the stomach. If we open the mouth
before a mirror we see through the fauces the rear wall of the pharynx. In
its lining membrane is a large number of glands, the secretion from which
during a severe cold may be quite troublesome.

The œsophagus, or gullet, is a tube about nine inches long,
reaching from the throat to the stomach. It lies behind the windpipe,
pierces the diaphragm between the chest and abdomen, and opens into the
stomach. It has in its walls muscular fibers, which, by their worm-like
contractions, grasp the successive masses of food swallowed, and pass them
along downwards into the stomach.

138. Deglutition, or Swallowing. The food, having been well chewed
and mixed with saliva, is now ready to be swallowed as a soft, pasty mass.
The tongue gathers it up and forces it backwards between the pillars of
the fauces into the pharynx.

If we place the fingers on the "Adam's apple," and then pretend to
swallow something, we can feel the upper part of the windpipe and the
closing of its lid (epiglottis), so as to cover the entrance and prevent
the passage of food into the trachea.

There is only one pathway for the food to travel, and that is down the
œsophagus. The slow descent of the food may be seen if a horse or
dog be watched while swallowing. Even liquids do not fall or flow down the
food passage. Hence, acrobats can drink while standing on their heads, or
a horse with its mouth below the level of the œsophagus. The food is
under the control of the will until it has entered the pharynx; all the
later movements are involuntary.

[Illustration: Fig. 51.--A View into the Back Part of the Adult Mouth.
(The head is represented as having been thrown back, and the tongue drawn
forward.)

  A, B, incisors;
  C, canine;
  D, E, bicuspids;
  F, H, K, molars;
  M, anterior pillar of the fauces;
  N, tonsil;
  L, uvula;
  O, upper part of the pharynx;
  P, tongue drawn forward;
  R, linear ridge, or raphé.
]

139. The Stomach. The stomach is the most dilated portion of the
alimentary canal and the principal organ of digestion. Its form is not
easily described. It has been compared to a bagpipe, which it resembles
somewhat, when moderately distended. When empty it is flattened, and in
some parts its opposite walls are in contact.

We may describe the stomach as a pear-shaped bag, with the large end to
the left and the small end to the right. It lies chiefly on the left side
of the abdomen, under the diaphragm, and protected by the lower ribs. The
fact that the large end of the stomach lies just beneath the diaphragm and
the heart, and is sometimes greatly distended on account of indigestion or
gas, may cause feelings of heaviness in the chest or palpitation of the
heart. The stomach is subject to greater variations in size than any other
organ of the body, depending on its contents. Just after a moderate meal
it averages about twelve inches in length and four in diameter, with a
capacity of about four pints.

[Illustration: Fig. 52.--The Stomach. A, cardiac end; B, pyloric end, C,
lesser curvature, D, greater curvature]

The orifice by which the food enters is called the cardiac opening,
because it is near the heart. The other opening, by which the food leaves
the stomach, and where the small intestine begins, is the pyloric
orifice, and is guarded by a kind of valve, known as the pylorus, or
gatekeeper. The concave border between the two orifices is called the
_small curvature_, and the convex as the _great curvature_, of the
stomach.

140. Coats of Stomach. The walls of the stomach are formed by four
coats, known successively from without as serous, muscular,
sub-mucous, and mucous. The outer coat is the serous membrane
which lines the abdomen,--the peritoneum (note, p. 135). The second
coat is muscular, having three sets of involuntary muscular fibers. The
outer set runs lengthwise from the cardiac orifice to the pylorus. The
middle set encircles all parts of the stomach, while the inner set
consists of oblique fibers. The third coat is the sub-mucous, made up of
loose connective tissues, and binds the mucous to the muscular coat.
Lastly there is the mucous coat, a moist, pink, inelastic membrane, which
completely lines the stomach. When the stomach is not distended, the
mucous layer is thrown into folds presenting a corrugated appearance.

[Illustration: Fig. 53.--Pits in the Mucous Membrane of the Stomach, and
Openings of the Gastric Glands. (Magnified 20 diameters.)]

141. The Gastric Glands. If we were to examine with a hand lens the
inner surface of the stomach, we would find it covered with little pits,
or depressions, at the bottom of which would be seen dark dots. These dots
are the openings of the gastric glands. In the form of fine, wavy
tubes, the gastric glands are buried in the mucous membrane, their mouths
opening on the surface. When the stomach is empty the mucous membrane is
pale, but when food enters, it at once takes on a rosy tint. This is due
to the influx of blood from the large number of very minute blood-vessels
which are in the tissue between the rows of glands.

The cells of the gastric glands are thrown into a state of greater
activity by the increased quantity of blood supply. As a result, soon
after food enters the stomach, drops of fluid collect at the mouths of the
glands and trickle down its walls to mix with the food. Thus these glands
produce a large quantity of gastric juice, to aid in the digestion of
food.

142. Digestion in the Stomach. When the food, thoroughly mixed with
saliva, reaches the stomach, the cardiac end of that organ is closed as
well as the pyloric valve, and the muscular walls contract on the
contents. A spiral wave of motion begins, becoming more rapid as digestion
goes on. Every particle of food is thus constantly churned about in the
stomach and thoroughly mixed with the gastric juice. The action of the
juice is aided by the heat of the parts, a temperature of about 99°
Fahrenheit.

The gastric juice is a thin almost colorless fluid with a sour taste
and odor. The reaction is distinctly acid, normally due to free
hydrochloric acid. Its chief constituents are two ferments called pepsin
and rennin, free hydrochloric acid, mineral salts, and 95 per cent of
water.

[Illustration: Fig. 54.--A highly magnified view of a peptic or gastric
gland, which is represented as giving off branches. It shows the columnar
epithelium of the surface dipping down into the duct D of the gland, from
which two tubes branch off. Each tube is lined with columnar epithelial
cells, and there is a minute central passage with the "neck" at N. Here
and there are seen other special cells called parietal cells, P, which are
supposed to produce the acid of the gastric juice. The principal cells are
represented at C.]

Pepsin the important constituent of the gastric juice, has the
power, in the presence of an acid, of dissolving the proteid food-stuffs.
Some of which is converted into what are called _peptones_, both soluble
and capable of filtering through membranes. The gastric juice has no
action on starchy foods, neither does it act on fats, except to dissolve
the albuminous walls of the fat cells. The fat itself is thus set free in
the form of minute globules. The whole contents of the stomach now assume
the appearance and the consistency of a thick soup, usually of a grayish
color, known as chyme.

It is well known that "rennet" prepared from the calf's stomach has a
remarkable effect in rapidly curdling milk, and this property is utilized
in the manufacture of cheese. Now, a similar ferment is abundant in the
gastric juice, and may be called _rennin_. It causes milk to clot, and
does this by so acting on the casein as to make the milk set into a jelly.
Mothers are sometimes frightened when their children, seemingly in perfect
health, vomit masses of curdled milk. This curdling of the milk is,
however, a normal process, and the only noteworthy thing is its rejection,
usually due to overfeeding.

  Experiment 58. _To show that pepsin and acid are necessary for
  gastric digestion._ Take three beakers, or large test tubes; label them
  _A_, _B_, _C_. Put into _A_ water and a few grains of powdered pepsin.
  Fill _B_ two-thirds full of dilute hydrochloric acid (one teaspoonful to
  a pint), and fill _C_ two-thirds full of hydrochloric acid and a few
  grains of pepsin. Put into each a small quantity of well-washed fibrin,
  and place them all in a water bath at 104° Fahrenheit for half an hour.

  Examine them. In _A_, the fibrin is unchanged; in _B_, the fibrin is
  clear and swollen up; in _C_, it has disappeared, having first become
  swollen and clear, and completely dissolved, being finally converted
  into peptones. Therefore, both acid and ferment are required for gastric
  digestion.

  Experiment 59. Half fill with dilute hydrochloric acid three large
  test tubes, labelled _A_, _B_, _C_. Add to each a few grains of pepsin.
  Boil _B_, and make _C_ faintly alkaline with sodic carbonate. The
  alkalinity may be noted by adding previously some neutral litmus
  solution. Add to each an equal amount--a few threads--of well-washed
  fibrin which has been previously steeped for some time in dilute
  hydrochloric acid, so that it is swollen and transparent. Keep the tubes
  in a water-bath at about 104° Fahrenheit for an hour and examine them at
  intervals of twenty minutes.

  After five to ten minutes the fibrin in _A_ is dissolved and the fluid
  begins to be turbid. In _B_ and _C_ there is no change. Even after long
  exposure to 100° Fahrenheit there is no change in _B_ and _C_.

  After a variable time, from one to four hours, the contents of the
  stomach, which are now called chyme, begin to move on in successive
  portions into the next part of the intestinal canal. The ring-like
  muscles of the pylorus relax at intervals to allow the muscles of the
  stomach to force the partly digested mass into the small intestines.
  This action is frequently repeated, until even the indigestible masses
  which the gastric juice cannot break down are crowded out of the stomach
  into the intestines. From three to four hours after a meal the stomach
  is again quite emptied.

A certain amount of this semi-liquid mass, especially the peptones, with
any saccharine fluids, resulting from the partial conversion of starch or
otherwise, is at once absorbed, making its way through the delicate
vessels of the stomach into the blood current, which is flowing through
the gastric veins to the portal vein of the liver.

[Illustration: Fig. 55.--A Small Portion of the Mucous Membrane of the
Small Intestine. (Villi are seen surrounded with the openings of the
tubular glands.) [Magnified 20 diameters.]]

143. The Small Intestine. At the pyloric end of the stomach the
alimentary canal becomes again a slender tube called the small
intestine. This is about twenty feet long and one inch in diameter,
and is divided, for the convenience of description, into three parts.

The first 12 inches is called the duodenum. Into this portion opens
the bile duct from the liver with the duct from the pancreas, these having
been first united and then entering the intestine as a common duct.

The next portion of the intestine is called the jejunum, because it
is usually empty after death.

The remaining portion is named the ileum, because of the many folds
into which it is thrown. It is the longest part of the small intestine,
and terminates in the right iliac region, opening into the large
intestine. This opening is guarded by the folds of the membrane forming
the ileo-cæcal valve, which permits the passage of material from the
small to the large intestine, but prevents its backward movement.

144. The Coats of the Small Intestine. Like the stomach, the small
intestine has four coats, the serous, muscular, sub-mucous,
and mucous. The serous is the peritoneum.[22] The muscular consists
of an outer layer of longitudinal, and an inner layer of circular fibers,
by contraction of which the food is forced along the bowel. The sub-mucous
coat is made up of a loose layer of tissue in which the blood-vessels and
nerves are distributed. The inner, or mucous, surface has a fine, velvety
feeling, due to a countless number of tiny, thread-like projections,
called villi. They stand up somewhat like the "pile" of velvet. It is
through these villi that the digested food passes into the blood.

[Illustration: Fig. 56.--Sectional View of Intestinal Villi. (Black dots
represent the glandular openings.)]

The inner coat of a large part of the small intestine is thrown into
numerous transverse folds called _valvulæ conniventes_. These seem to
serve two purposes, to increase the extent of the surface of the bowels
and to delay mechanically the progress of the intestinal contents. Buried
in the mucous layer throughout the length, both of the small and large
intestines, are other glands which secrete intestinal fluids. Thus, in the
lower part of the ileum there are numerous glands in oval patches known as
_Peyer's patches_. These are very prone to become inflamed and to ulcerate
during the course of typhoid fever.

145. The Large Intestine. The large intestine begins in the
right iliac region and is about five or six feet long. It is much larger
than the small intestine, joining it obliquely at short distance from its
end. A blind pouch, or dilated pocket is thus formed at the place of
junction, called the cæcum. A valvular arrangement called the
ileo-cæcal valve, which is provided with a button-hole slit, forms a kind
of movable partition between this part of the large intestine and the
small intestine.

[Illustration: Fig. 57.--Tubular Glands of the Small Intestines.

A, B, tubular glands seen in vertical section with their orifices at C,
opening upon the membrane between the villi, D, villus (Magnified 40
diameters)]

Attached to the cæcum is a worm-shaped tube, about the size of a lead
pencil, and from three to four inches long, called the _vermiform
appendix_. Its use is unknown. This tube is of great surgical importance,
from the fact that it is subject to severe inflammation, often resulting
in an internal abscess, which is always dangerous and may prove fatal.
Inflammation of the appendix is known as _appendicitis_,--a name quite
familiar on account of the many surgical operations performed of late
years for its relief.

The large intestine passes upwards on the right side as the ascending
colon, until the under side of the liver is reached, where it passes
to the left side, as the transverse colon, below the stomach. It
there turns downward, as the descending colon, and making an S-shaped
curve, ends in the rectum. Thus the large intestine encircles, in the
form of a horseshoe, the convoluted mass of small intestines.

Like the small intestine, the large has four coats. The mucous coat,
however, has no folds, or villi, but numerous closely set glands, like
some of those of the small intestine. The longitudinal muscular fibers of
the large intestine are arranged in three bands, or bundles, which, being
shorter than the canal itself, produce a series of bulgings or pouches in
its walls. This sacculation of the large bowel is supposed to be designed
for delaying the onward flow of its contents, thus allowing more time for
the absorption of the liquid material. The blood-vessels and nerves of
this part of the digestive canal are very numerous, and are derived from
the same sources as those of the small intestine.

146. The Liver. The liver is a part of the digestive apparatus,
since it forms the bile, one of the digestive fluids. It is a large
reddish-brown organ, situated just below the diaphragm, and on the right
side. The liver is the largest gland in the body, and weighs from 50 to 60
ounces. It consists of two lobes, the right and the left, the right being
much the larger. The upper, convex surface of the liver is very smooth and
even; but the under surface is irregular, broken by the entrance and exit
of the various vessels which belong to the organ. It is held in its place
by five ligaments, four of which are formed by double folds of the
peritoneum.

The thin front edge of the liver reaches just below the bony edge of the
ribs; but the dome-shaped diaphragm rises slightly in a horizontal
position, and the liver passes up and is almost wholly covered by the
ribs. In tight lacing, the liver is often forced downward out from the
cover of the ribs, and thus becomes permanently displaced. As a result,
other organs in the abdomen and pelvis are crowded together, and also
become displaced.

147. Minute Structure of the Liver. When a small piece of the liver
is examined under a microscope it is found to be made up of masses of
many-sided cells, each about 1/1000 of an inch in diameter. Each group of
cells is called a _lobule_. When a single lobule is examined under the
microscope it appears to be of an irregular, circular shape, with its
cells arranged in rows, radiating from the center to the circumference.
Minute, hair-like channels separate the cells one from another, and unite
in one main duct leading from the lobule. It is the lobules which give to
the liver its coarse, granular appearance, when torn across.

[Illustration: Fig. 58.--Diagrammatic Section of a Villus

  A, layer of columnar epithelium covering the villus;
  B, central lacteal of villus;
  C, unstriped muscular fibers;
  D, goblet cell
]

Now there is a large vessel called the portal vein that brings to the
liver blood full of nourishing material obtained from the stomach and
intestines. On entering the liver this great vein conducts itself as if it
were an artery. It divides and subdivides into smaller and smaller
branches, until, in the form of the tiniest vessels, called capillaries,
it passes inward among the cells to the very center of the hepatic
lobules.

148. The Bile. We have in the liver, on a grand scale, exactly the
same conditions as obtain in the smaller and simpler glands. The
thin-walled liver cells take from the blood certain materials which they
elaborate into an important digestive fluid, called the bile.[23]
This newly manufactured fluid is carried away in little canals, called
_bile ducts_. These minute ducts gradually unite and form at last one main
duct, which carries the bile from the liver. This is known as the hepatic
duct. It passes out on the under side of the liver, and as it
approaches the intestine, it meets at an acute angle the cystic duct which
proceeds from the gall bladder and forms with it the common bile
duct. The common duct opens obliquely into the horseshoe bend of the
duodenum.

The cystic duct leads back to the under surface of the liver, where
it expands into a sac capable of holding about two ounces of fluid, and is
known as the gall bladder. Thus the bile, prepared in the depths of
the liver by the liver cells, is carried away by the bile ducts, and may
pass directly into the intestines to mix with the food. If, however,
digestion is not going on, the mouth of the bile duct is closed, and in
that case the bile is carried by the cystic duct to the gall bladder. Here
it remains until such time as it is needed.

149. Blood Supply of the Liver. We must not forget that the liver
itself, being a large and important organ, requires constant nourishment
for the work assigned to it. The blood which is brought to it by the
portal vein, being venous, is not fit to nourish it. The work is done by
the arterial blood brought to it by a great branch direct from the aorta,
known as the hepatic artery, minute branches of which in the form of
capillaries, spread themselves around the hepatic lobules.

The blood, having done its work and now laden with impurities, is picked
up by minute veinlets, which unite again and again till they at last form
one great trunk called the hepatic vein. This carries the impure
blood from the liver, and finally empties it into one of the large veins
of the body.

After the blood has been robbed of its bile-making materials, it is
collected by the veinlets that surround the lobules, and finds its way
with other venous blood into the hepatic vein. In brief, blood is brought
to the liver and distributed through its substance by two distinct
channels,--the portal vein and the hepatic artery, but it leaves
the liver by one distinct channel,--the hepatic vein.

[Illustration: Fig. 59--Showing the Relations of the Duodenum and Other
Intestinal Organs. (A portion of the stomach has been cut away.)]

150. Functions of the Liver. We have thus far studied the liver only
as an organ of secretion, whose work is to elaborate bile for future use
in the process of digestion. This is, however, only one of its functions,
and perhaps not the most important. In fact, the functions of the liver
are not single, but several. The bile is not wholly a digestive fluid, but
it contains, also, materials which are separated from the blood to be
cast out of the body before they work mischief. Thus, the liver ranks
above all others as an organ of excretion, that is, it separates
material of no further use to the body.

Of the various ingredients of the bile, only the bile salts are of use in
the work of digestion, for they act upon the fats in the alimentary canal,
and aid somehow in their emulsion and absorption. They appear to be
themselves split up into other substances, and absorbed with the dissolved
fats into the blood stream again.

The third function of the liver is very different from those already
described. It is found that the liver of an animal well and regularly fed,
when examined soon after death, contains a quantity of a carbohydrate
substance not unlike starch. This substance, extracted in the form of a
white powder, is really an animal starch. It is called glycogen, or
liver sugar, and is easily converted into grape sugar.

The hepatic cells appear to manufacture this glycogen and to store it up
from the food brought by the portal blood. It is also thought the glycogen
thus deposited and stored up in the liver is little by little changed into
sugar. Then, as it is wanted, the liver disposes of this stored-up
material, by pouring it, in a state of solution, into the hepatic vein. It
is thus steadily carried to the tissues, as their needs demand, to supply
them with material to be transformed into heat and energy.

151. The Pancreas. The pancreas, or sweetbread, is much smaller
than the liver. It is a tongue-like mass from six to eight inches long,
weighing from three to four ounces, and is often compared in appearance to
a dog's tongue. It is somewhat the shape of a hammer with the handle
running to a point.

The pancreas lies behind the stomach, across the body, from right to left,
with its large head embraced in the horseshoe bend of the duodenum. It
closely resembles the salivary glands in structure, with its main duct
running from one end to the other. This duct at last enters the duodenum
in company with the common bile duct.

The pancreatic juice, the most powerful in the body, is clear,
somewhat viscid, fluid. It has a decided alkaline reaction and is not
unlike saliva in many respects. Combined with the bile, this juice acts
upon the large drops of fat which pass from the stomach into the duodenum
and emulsifies them. This process consists partly in producing a fine
subdivision of the particles of fat, called an emulsion, and partly in a
chemical decomposition by which a kind of soap is formed. In this way the
oils and fats are divided into particles sufficiently minute to permit of
their being absorbed into the blood.

Again, this most important digestive fluid produces on starch an action
similar to that of saliva, but much more powerful. During its short stay
in the mouth, very little starch is changed into sugar, and in the
stomach, as we have seen, the action of the saliva is arrested. Now, the
pancreatic juice takes up the work in the small intestine and changes the
greater part of the starch into sugar. Nor is this all, for it also acts
powerfully upon the proteids not acted upon in the stomach, and changes
them into peptones that do not differ materially from those resulting from
gastric digestion. The remarkable power which the pancreatic juice
possesses of acting on all the food-stuffs appears to be due mainly to the
presence of a specific element or ferment, known as _trypsin_.

  Experiment 60. _To show the action of pancreatic juice upon oils or
  fats._ Put two grains of Fairchild's extract of pancreas into a
  four-ounce bottle. Add half a teaspoonful of warm water, and shake well
  for a few minutes; then add a tablespoonful of cod liver oil; shake
  vigorously.

  A creamy, opaque mixture of the oil and water, called an emulsion, will
  result. This will gradually separate upon standing, the pancreatic
  extract settling in the water at the bottom. When shaken it will again
  form an emulsion.

  Experiment 61. _To show the action of pancreatic juice on starch_.
  Put two tablespoonfuls of _smooth_ starch paste into a goblet, and while
  still so warm as just to be borne by the mouth, stir into it two grains
  of the extract of pancreas. The starch paste will rapidly become
  thinner, and gradually change into soluble starch, in a perfectly fluid
  solution. Within a few minutes some of the starch is converted through
  intermediary stages into maltose. Use the Fehling test for sugar.

152. Digestion in the Small Intestines. After digestion in the
stomach has been going on for some time, successive portions of the
semi-digested food begin to pass into the duodenum. The pancreas now takes
on new activity, and a copious flow of pancreatic juice is poured along
its duct into the intestines. As the food is pushed along over the common
opening of the bile and pancreatic ducts, a great quantity of bile from
this reservoir, the gall bladder, is poured into the intestines. These two
digestive fluids are now mixed with the chyme, and act upon it in the
remarkable manner just described.

[Illustration: Fig. 60.--Diagrammatic Scheme of Intestinal Absorption.

  A, mesentery;
  B, lacteals and mesentery glands;
  C, veins of intestines;
  R.C, receptacle of the chyle (receptaculum chyli);
  P V, portal vein;
  H V, hepatic veins;
  S.V.C, superior vena cava;
  R.A, right auricle of the heart;
  I.V.C, inferior vena cava.
]

The inner surface of the small intestine also secretes a liquid called
intestinal juice, the precise functions of which are not known. The
chyme, thus acted upon by the different digestive fluids, resembles a
thick cream, and is now called chyle. The chyle is propelled along
the intestine by the worm-like contractions of its muscular walls. A
function of the bile, not yet mentioned, is to stimulate these movements,
and at the same time by its antiseptic properties to prevent putrefaction
of the contents of the intestine.

153. Digestion in the Large Intestines. Digestion does not occur to
any great extent in the large intestines. The food enters this portion of
the digestive canal through the ileo-cæcal valve, and travels through it
slowly. Time is thus given for the fluid materials to be taken up by the
blood-vessels of the mucous membrane. The remains of the food now become
less fluid, and consist of undigested matter which has escaped the action
of the several digestive juices, or withstood their influence. Driven
onward by the contractions of the muscular walls, the refuse materials at
last reach the rectum, from which they are voluntarily expelled from the
body.



Absorption.


154. Absorption. While food remains within the alimentary canal it is as
much outside of the body, so far as nutrition is concerned, as if it had
never been taken inside. To be of any service the food must enter the
blood; it must be absorbed. The efficient agents in absorption are the
blood-vessels, the lacteals, and the lymphatics. The process through which
the nutritious material is fitted to enter the blood, is called
absorption. It is a process not confined, as we shall see, simply to the
alimentary canal, but one that is going on in every tissue.

The vessels by which the process of absorption is carried on are called
absorbents. The story, briefly told, is this: certain food materials
that have been prepared to enter the blood, filter through the mucous
membrane of the intestinal canal, and also the thin walls of minute
blood-vessels and lymphatics, and are carried by these to larger vessels,
and at last reach the heart, thence to be distributed to the tissues.

155. Absorption from the Mouth and Stomach. The lining of the mouth
and œsophagus is not well adapted for absorption. That this does
occur is shown by the fact that certain poisonous chemicals, like cyanide
of potash, if kept in the mouth for a few moments will cause death. While
we are chewing and swallowing our food, no doubt a certain amount of water
and common salt, together with sugar which has been changed from starch by
the action of the saliva, gains entrance to the blood.

In the stomach, however, absorption takes place with great activity. The
semi-liquid food is separated from the enormous supply of blood-vessels in
the mucous membrane only by a thin porous partition. There is, therefore,
nothing to prevent the exchange taking place between the blood and the
food. Water, along with any substances in the food that have become
dissolved, will pass through the partition and enter the blood-current.
Thus it is that a certain amount of starch that has been changed into
sugar, of salts in solution, of proteids converted into peptones, is taken
up directly by the blood-vessels of the stomach.

156. Absorption by the Intestines. Absorption by the intestines is a
most active and complicated process. The stomach is really an organ more
for the digestion than the absorption of food, while the small intestines
are especially constructed for absorption. In fact, the greatest part of
absorption is accomplished by the small intestines. They have not only a
very large area of absorbing surface, but also structures especially
adapted to do this work.

157. The Lacteals. We have learned in Section 144 that the mucous
lining of the small intestines is crowded with millions of little
appendages called villi, meaning "tufts of hair." These are only
about 1/30 of an inch long, and a dime will cover more than five hundred
of them. Each villus contains a loop of blood-vessels, and another vessel,
the lacteal, so called from the Latin word _lac_, milk, because of the
milky appearance of the fluid it contains. The villi are adapted
especially for the absorption of fat. They dip like the tiniest fingers
into the chyle, and the minute particles of fat pass through their
cellular covering and gain entrance to the lacteals. The milky material
sucked up by the lacteals is not in a proper condition to be poured at
once into the blood current. It is, as it were, in too crude a state, and
needs some special preparation.

The intestines are suspended to the posterior wall of the abdomen by a
double fold of peritoneum called the mesentery. In this membrane are
some 150 glands about the size of an almond, called mesenteric
glands. Now the lacteals join these glands and pour in their fluid
contents to undergo some important changes. It is not unlikely that the
mesenteric glands may intercept, like a filter, material which, if allowed
to enter the blood, would disturb the whole body. Thus, while the glands
might suffer, the rest of the body might escape. This may account for the
fact that these glands and the lymphatics may be easily irritated and
inflamed, thus becoming enlarged and sensitive, as often occurs in the
axilla.

Having been acted upon by the mesenteric glands, and passed through them,
the chyle flows onward until it is poured into a dilated reservoir for the
chyle, known as the receptaculum chyli. This is a sac-like expansion
of the lower end of the thoracic duct. Into this receptacle, situated at
the level of the upper lumbar vertebræ, in front of the spinal column, are
poured, not only the contents of the lacteals, but also of the lymphatic
vessels of the lower limbs.

158. The Thoracic Duct. This duct is a tube from fifteen to eighteen
inches long, which passes upwards in front of the spine to reach the base
of the neck, where it opens at the junction of the great veins of the left
side of the head with those of the left arm. Thus the thoracic duct
acts as a kind of feeding pipe to carry along the nutritive material
obtained from the food and to pour it into the blood current. It is to be
remembered that the lacteals are in reality lymphatics--the
lymphatics of the intestines.

[Illustration: Fig. 61.--Section of a Lymphatic Gland.

  A, strong fibrous capsule sending partitions into the gland;
  B, partitions between the follicles or pouches of the _cortical_ or
     outer portion;
  C, partitions of the _medullary_ or central portion;
  D, E, masses of protoplasmic matter in the pouches of the gland;
  F, lymph-vessels which bring lymph _to_ the gland, passing into its
     center;
  G, confluence of those leading to the efferent vessel;
  H, vessel which carries the lymph away _from_ the gland.
]

159. The Lymphatics. In nearly every tissue and organ of the body
there is a marvelous network of vessels, precisely like the lacteals,
called the lymphatics. These are busily at work taking up and making
over anew waste fluids or surplus materials derived from the blood and
tissues generally. It is estimated that the quantity of fluid picked up
from the tissues by the lymphatics and restored daily to the circulation
is equal to the bulk of the blood in the body. The lymphatics seem to
start out from the part in which they are found, like the rootlets of a
plant in the soil. They carry a turbid, slightly yellowish fluid, called
lymph, very much like blood without the red corpuscles.

Now, just as the chyle was not fit to be immediately taken up by the
blood, but was passed through the mesenteric glands to be properly worked
over, so the lymph is carried to the lymphatic glands, where it
undergoes certain changes to fit it for being poured into the blood.
Nature, like a careful housekeeper, allows nothing to be wasted that can
be of any further service in the animal economy (Figs. 63 and 64).

The lymphatics unite to form larger and larger vessels, and at last join
the thoracic duct, except the lymphatics of the right side of the head and
chest and right arm. These open by the right lymphatic duct into the
venous system on the right side of the neck.

The whole lymphatic system may be regarded as a necessary appendage to the
vascular system (Chapter VII.). It is convenient, however, to treat it
under the general topic of absorption, in order to complete the history of
food digestion.

160. The Spleen and Other Ductless Glands. With the lymphatics may be
classified, for convenience, a number of organs called ductless or
blood glands. Although they apparently prepare materials for use in
the body, they have no ducts or canals along which may be carried the
result of their work. Again, they are called blood glands because it is
supposed they serve some purpose in preparing material for the blood.

The spleen is the largest of these glands. It lies beneath the
diaphragm, and upon the left side of the stomach. It is of a deep red
color, full of blood, and is about the size and shape of the palm of the
hand.

The spleen has a fibrous capsule from which partitions pass inwards,
dividing it into spaces by a framework of elastic tissue, with plain
muscular fibers. These spaces are filled with what is called the spleen
pulp, through which the blood filters from its artery, just as a fluid
would pass through a sponge. The functions of the spleen are not known. It
appears to take some part in the formation of blood corpuscles. In certain
diseases, like malarial fever, it may become remarkably enlarged. It may
be wholly removed from an animal without apparent injury. During digestion
it seems to act as a muscular pump, drawing the blood onwards with
increased vigor along its large vein to the liver.

The thyroid is another ductless gland. It is situated beneath the
muscles of the neck on the sides of "Adam's apple" and below it. It
undergoes great enlargement in the disease called goitre.

The thymus is also a blood gland. It is situated around the windpipe,
behind the upper part of the breastbone. Until about the end of the second
year it increases in size, and then it begins gradually to shrivel away.
Like the spleen, the thyroid and thymus glands are supposed to work some
change in the blood, but what is not clearly known.

The suprarenal capsules are two little bodies, one perched on the top
of each kidney, in shape not unlike that of a conical hat. Of their
functions nothing definite is known.



Experiments.


The action produced by the tendency of fluids to mix, or become equally
diffused in contact with each other, is known as _osmosis_, a form of
molecular attraction allied to that of adhesion. The various physical
processes by which the products of digestion are transferred from the
digestive canal to the blood may be illustrated in a general way by the
following simple experiments.

The student must, however, understand that the necessarily crude
experiments of the classroom may not conform in certain essentials to
these great processes conducted in the living body, which they are
intended to illustrate and explain.

[Illustration: Fig. 62.]

  Experiment 62. _Simple Apparatus for Illustrating Endosmotic
  Action._ "Remove carefully a circular portion, about an inch in
  diameter, of the shell from one end of an egg, which may be done without
  injuring the membranes, by cracking the shell in small pieces, which are
  picked off with forceps. A small glass tube is then introduced through
  an opening in the shell and membranes of the other end of the egg, and
  is secured in a vertical position by wax or plaster of Paris, the tube
  penetrating the yelk. The egg is then placed in a wine-glass partly
  filled with water. In the course of a few minutes, the water will have
  penetrated the exposed membrane, and the yelk will rise in the
  tube."--Flint's _Human Physiology_, page 293.

  Experiment 63. Stretch a piece of moist bladder across a glass
  tube,--a common lamp-chimney will do. Into this put a strong saline
  solution. Now suspend the tube in a wide mouthed vessel of water. After
  a short time it will be found that a part of the salt solution has
  passed through into the water, while a larger amount of water has passed
  into the tube and raised the height of the liquid within it.

161. The Quantity of Food as Affected by Age. The quantity of food
required to keep the body in proper condition is modified to a great
extent by circumstances. Age, occupation, place of residence, climate, and
season, as well as individual conditions of health and disease, are always
important factors in the problem. In youth the body is not only growing,
but the tissue changes are active. The restless energy and necessary
growth at this time of life cannot be maintained without an abundance of
wholesome food. This food supply for young people should be ample enough
to answer the demands of their keen appetite and vigorous digestion.

In adult life, when the processes of digestion and assimilation are
active, the amount of food may without harm, be in excess of the actual
needs of the body. This is true, however, only so long as active muscular
exercise is taken.

In advanced life the tissue changes are slow, digestion is less active,
and the ability to assimilate food is greatly diminished. Growth has
ceased, the energy which induced activity is gone, and the proteids are no
longer required to build up worn-out tissues. Hence, as old age
approaches, the quantity of nitrogenous foods should be steadily
diminished.

  Experiment 64. Obtain a sheep's bladder and pour into it a heavy
  solution of sugar or some colored simple elixir, found at any drug
  store. Tie the bladder carefully and place it in a vessel containing
  water. After a while it will be found that an interchange has occurred,
  water having passed into the bladder and the water outside having become
  sweet.

  Experiment 65. Make a hole about as big as a five-cent piece in the
  large end of an egg. That is, break the shell carefully and snip the
  outer shell membrane, thus opening the space between the outer and inner
  membranes. Now put the egg into a glass of water, keeping it in an
  upright position by resting on a napkin-ring. There is only the inner
  shell membrane between the liquid white of the egg (albumen) and the
  water.

  An interchange takes place, and the water passes towards the albumen. As
  the albumen does not pass out freely towards the water, the membrane
  becomes distended, like a little bag at the top of the egg.

162. Ill Effects of a too Generous Diet. A generous diet, even of
those who take active muscular exercise, should be indulged in only with
vigilance and discretion. Frequent sick or nervous headaches, a sense of
fullness, bilious attacks, and dyspepsia are some of the after-effects of
eating more food than the body actually requires. The excess of food is
not properly acted upon by the digestive juices, and is liable to undergo
fermentation, and thus to become a source of irritation to the stomach and
the intestines. If too much and too rich food be persistently indulged in,
the complexion is apt to become muddy, the skin, especially of the face,
pale and sallow, and more or less covered with blotches and pimples; the
breath has an unpleasant odor, and the general appearance of the body is
unwholesome.

An excess of any one of the different classes of foods may lead to serious
results. Thus a diet habitually too rich in proteids, as with those who
eat meat in excess, often over-taxes the kidneys to get rid of the excess
of nitrogenous waste, and the organs of excretion are not able to rid the
tissues of waste products which accumulate in the system. From the blood,
thus imperfectly purified, may result kidney troubles and various diseases
of the liver and the stomach.

163. Effect of Occupation. Occupation has an important influence upon
the quantity of food demanded for the bodily support. Those who work long
and hard at physical labor, need a generous amount of nutritious food. A
liberal diet of the cereals and lean meat, especially beef, gives that
vigor to the muscles which enables one to undergo laborious and prolonged
physical exertion. On the other hand, those who follow a sedentary
occupation do not need so large a quantity of food. Brain-workers who
would work well and live long, should not indulge in too generous a diet.
The digestion of heavy meals involves a great expenditure of nervous
force. Hence, the forces of the brain-worker, being required for mental
exertion, should not be expended to an unwarranted extent on the task of
digestion.

164. Effect of Climate. Climate also has a marked influence on the
quantity of food demanded by the system. Much more food of all kinds is
consumed in cold than in warm climates. The accounts by travelers of the
quantity of food used by the inhabitants of the frigid zone are almost
beyond belief. A Russian admiral gives an instance of a man who, in his
presence, ate at a single meal 28 pounds of rice and butter. Dr. Hayes,
the Arctic traveler, states from personal observation that the daily
ration of the Eskimos is 12 to 15 pounds of meat. With the thermometer
ranging from 60 to 70° F. below zero, there was a persistent craving for
strong animal diet, especially fatty foods.[24]

[Illustration: Fig. 63.--Lymphatics and Lymphatic Glands of the Axilla.]

The intense cold makes such a drain upon the heat-producing power of the
body that only food containing the largest proportion of carbon is capable
of making up for the loss. In tropical countries, on the other hand, the
natives crave and subsist mainly upon fruits and vegetables.

165. The Kinds of Food Required. An appetite for plain, well-cooked
food is a safe guide to follow. Every person in good health, taking a
moderate amount of daily exercise, should have a keen appetite for three
meals a day and enjoy them. Food should be both nutritious and digestible.
It is nutritious in proportion to the amount of material it furnishes for
the nourishment of the tissues. It is digestible in a greater or less
degree in respect to the readiness with which it yields to the action of
the digestive fluids, and is prepared to be taken up by the blood. This
digestibility depends partly upon the nature of the food in its raw state,
partly upon the effect produced upon it by cooking, and to some extent
upon its admixture with other foods. Certain foods, as the vegetable
albumens, are both nutritious and digestible. A hard-working man may grow
strong and maintain vigorous health on most of them, even if deprived of
animal food.

While it is true that the vegetable albumens furnish all that is really
needed for the bodily health, animal food of some kind is an economical
and useful addition to the diet. Races of men who endure prolonged
physical exertion have discovered for themselves, without the teaching of
science, the great value of meat. Hence the common custom of eating meat
with bread and vegetables is a sound one. It is undoubtedly true that the
people of this country, as a rule, eat meat too often and too much at a
time. The judicious admixture of different classes of foods greatly aids
their digestibility.

The great abundance and variety of food in this country, permit this
principle to be put into practice. A variety of mixed foods, as milk,
eggs, bread, and meat, are almost invariably associated to a greater or
less extent at every meal.

Oftentimes where there is of necessity a sameness of diet, there arises a
craving for special articles of food. Thus on long voyages, and during
long campaigns in war, there is an almost universal craving for onions,
raw potatoes, and other vegetables.

166. Hints about Meals. On an average, three meals each day, from
five to six hours apart, is the proper number for adults. Five hours is by
no means too long a time to intervene between consecutive meals, for it is
not desirable to introduce new food into the stomach, until the gastric
digestion of the preceding meal has been completed, and until the stomach
has had time to rest, and is in condition to receive fresh material. The
stomach, like other organs, does its work best at regular periods.[25]

Eating out of mealtimes should be strictly avoided, for it robs the
stomach of its needed rest. Food eaten when the body and mind are wearied
is not well digested. Rest, even for a few minutes, should be taken before
eating a full meal. It is well to lie down, or sit quietly and read,
fifteen minutes before eating, and directly afterwards, if possible.

Severe exercise and hard study just after a full meal, are very apt to
delay or actually arrest digestion, for after eating heartily, the vital
forces of the body are called upon to help the stomach digest its food. If
our bodily energies are compelled, in addition to this, to help the
muscles or brain, digestion is retarded, and a feeling of dullness and
heaviness follows. Fermentative changes, instead of the normal digestive
changes, are apt to take place in the food.

167. Practical Points about Eating. We should not eat for at least
two or three hours before going to bed. When we are asleep, the vital
forces are at a low ebb, the process of digestion is for the time nearly
suspended, and the retention of incompletely digested food in the stomach
may cause bad dreams and troubled sleep. But in many cases of
sleeplessness, a trifle of some simple food, especially if the stomach
seems to feel exhausted, often appears to promote sleep and rest.

    [NOTE. The table on the next page shows the results of many
    experiments to illustrate the time taken for the gastric digestion of
    a number of the more common solid foods. There are a good many factors
    of which the table takes no account, such as the interval since the
    last meal, state of the appetite, amount of work and exercise, method
    of cooking, and especially the quantity of food.]

    Table Showing the Digestibility of the More Common Solid Foods.

    Food                          How        Time in
                                  Cooked     Stomach,
                                             Hours
    -------------------------------------------------
    Apples, sweet and mellow      Raw        1½
    Apples, sour and hard          "         2½
    Apple Dumpling                Boiled     3
    Bass, striped, fresh          Broiled    3
    Beans, pod                    Boiled     2½
    Beef, with salt only           "         2¾
     "    fresh, lean             Raw        3
     "      "      "              Fried      4
     "      "      "              Roasted    3½
     "    old, hard, salted       Boiled     4¼
    Beefsteak                     Broiled    3
    Beets                         Boiled     3¾
    Bread, corn                   Baked      3¼
     "     wheat, fresh            "         3½
    Butter                        Melted     3½
    Cabbage, with vinegar         Raw        2
     "        "     "             Boiled     4½
     "       heads                Raw        2½
    Carrots                       Boiled     3¼
    Cheese, old, strong           Raw        3½
    Chicken, full-grown           Fricassee  2¾
     "       soup                 Boiled     3
    Codfish, cured, dried          "         2
    Corncake                      Baked      2¾
    Custard                        "         2¾
    Duck, domestic                Roasted    4
     "    wild                     "         4½
    Eggs, fresh, whipped          Raw        1½
     "                             "         2
     "    soft-boiled             Boiled     3
     "    hard-boiled              "         3½
     "                            Fried      3½
    Fowl, domestic                Boiled     4
     "       "                    Roasted    4
    Gelatin                       Boiled     2½
    Goose                         Roasted    2½
    Green corn and beans          Boiled     3¾
    Hash, meat and vegetables     Warmed     2½
    Lamb                          Broiled    2½
    Liver                          "         2
    Milk                          Boiled     2
     "                            Raw        2¼
    Mutton, fresh                 Broiled    3
     "        "                   Boiled     3
     "        "                   Roasted    3¼
    Oysters, fresh                Raw        2½
     "        "                   Roasted    3¼
     "        "                   Stewed     3½
    Parsnips                      Boiled     2½
    Pig                           Roasted    2½
    Pig's feet, soused            Boiled     1
    Pork, recently salted          "         4½
     "                            Fried      4¼
     "                            Raw        3
     "    steaks                  Fried      3¼
     "                            Stewed     3
     "    fat or lean             Roasted    5¼
    Potatoes                      Baked      2½
     "                            Boiled     3½
     "                            Roasted    2½
    Rice                          Boiled     1
    Sago                           "         1¾
    Salmon, salted                 "         4
    Soup, barley                   "         1½
     "    beans                    "         3
     "    beef, vegetables, bread  "         4
     "    marrow bone              "         4½
     "    mutton                   "         3½
    Sponge Cake                   Baked      2½
    Suet, beef, fresh             Boiled     5⅓
     "    mutton                   "         4½
    Tapioca                        "         2
    Tripe, soused                  "         1
    Trout, salmon, fresh           "         1½
     "       "       "            Fried      1½
    Turkey, wild                  Roasted    2¼
     "      domestic              Boiled     2¼
     "        "                   Roasted    2½
    Turnips                       Boiled     3½
    Veal                          Roasted    4
     "                            Fried      4½
    Venison, steaks               Broiled    1½

The state of mind has much to do with digestion. Sudden fear or joy, or
unexpected news, may destroy the appetite at once. Let a hungry person be
anxiously awaiting a hearty meal, when suddenly a disastrous telegram is
brought him; all appetite instantly disappears, and the tempting food is
refused. Hence we should laugh and talk at our meals, and drive away
anxious thoughts and unpleasant topics of discussion.

The proper chewing of the food is an important element in digestion.
Hence, eat slowly, and do not "bolt" large fragments of food. If
imperfectly chewed, it is not readily acted upon by the gastric juice, and
often undergoes fermentative changes which result in sour stomach, gastric
pain, and other digestive disturbance.

If we take too much drink with our meals, the flow of the saliva is
checked, and digestion is hindered. It is not desireable to dilute the
gastric juice, nor to chill the stomach with large amount of cold liquid.

Do not take food and drink too hot or too cold. If they are taken too
cold, the stomach is chilled, and digestion delayed. If we drink freely of
ice-water, it may require half an hour or more for the stomach to regain
its natural heat.

It is a poor plan to stimulate a flagging appetite with highly spiced food
and bitter drinks. An undue amount of pepper, mustard, horseradish,
pickles, and highly seasoned meat-sauces may stimulate digestion for the
time, but they soon impair it.

    [NOTE. The process of gastric digestion was studied many years ago by
    Dr. Beaumont and others, in the remarkable case of Alexis St. Martin,
    a French-Canadian, who met with a gun-shot wound which left a
    permanent opening into his stomach, guarded by a little valve of
    mucous membrane. Through this opening the lining of the stomach could
    be seen, the temperature ascertained, and numerous experiments made as
    to the digestibility of various kinds of food.

    It was by these careful and convincing experiments that the foundation
    of our exact knowledge of the composition and action of gastric juice
    was laid. The modest book in which Dr. Beaumont published his results
    is still counted among the classics of physiology. The production of
    artificial fistulæ in animals, a method that has since proved so
    fruitful, was first suggested by his work.]

It cannot be too strongly stated that food of a simple character, well
cooked and neatly served, is more productive of healthful living than a
great variety of fancy dishes which unduly stimulate the digestive organs,
and create a craving for food in excess of the bodily needs.

168. The Proper Care of the Teeth. It is our duty not only to take
the very best care of our teeth, but to retain them as long as possible.
Teeth, as we well know, are prone to decay. We may inherit poor and soft
teeth: our mode of living may make bad teeth worse. If an ounce of
prevention is ever worth a pound of cure, it is in keeping the teeth in
good order. Bad teeth and toothless gums mean imperfect chewing of the
food and, hence, impaired digestion. To attain a healthful old age, the
power of vigorous mastication must be preserved.

One of the most frequent causes of decay of the teeth is the retention of
fragments of food between and around them. The warmth and moisture of the
mouth make these matters decompose quickly. The acid thus generated
attacks the enamel of the teeth, causing decay of the dentine. Decayed
teeth are often the cause of an offensive breath and a foul stomach.

[Illustration: Fig. 64.--Lymphatics on the Inside of the Right Hand.]

To keep the teeth clean and wholesome, they should be thoroughly cleansed
at bedtime and in the morning with a soft brush and warm water. Castile
soap, and some prepared tooth-powder without grit, should be used, and the
brush should be applied on both sides of the teeth.

The enamel, once broken through, is never renewed. The tooth decays,
slowly but surely: hence we must guard against certain habits which injure
the enamel, as picking the teeth with pins and needles. We should never
crack nuts, crush hard candy, or bite off stout thread with the teeth.
Stiff tooth-brushes, gritty and cheap tooth-powders, and hot food and
drink, often injure the enamel.

To remove fragments of food which have lodged between adjacent teeth, a
quill or wooden toothpick should be used. Even better than these is the
use of surgeon's floss, or silk, which when drawn between the teeth,
effectually dislodges retained particles. If the teeth are not regularly
cleansed they become discolored, and a hard coating known as _tartar_
accumulates on them and tends to loosen them. It is said that after the
age of thirty more teeth are lost from this deposit than from all other
causes combined. In fact decay and tartar are the two great agents that
furnish work for the dentist.[26]

169. Hints about Saving Teeth. We should exercise the greatest care
in saving the teeth. The last resort of all is to lose a tooth by
extraction. The skilled dentist will save almost anything in the shape of
a tooth.

People are often urged and consent to have a number of teeth extracted
which, with but little trouble and expense, might be kept and do good
service for years. The object is to replace the teeth with an artificial
set. Very few plates, either partial or entire, are worn with real
comfort. They should always be removed before going to sleep, as there is
danger of their being swallowed.

The great majority of drugs have no injurious effect upon the teeth. Some
medicines, however, must be used with great care. The acids used in the
tincture of iron have a great affinity for the lime salts of the teeth. As
this form of iron is often used, it is not unusual to see teeth very badly
stained or decayed from the effects of this drug. The acid used in the
liquid preparations of quinine may destroy the teeth in a comparatively
short time. After taking such medicines the mouth should be thoroughly
rinsed with a weak solution of common soda, and the teeth cleansed.

170. Alcohol and Digestion. The influence of alcoholic drinks upon
digestion is of the utmost importance. Alcohol is not, and cannot be
regarded from a physiological point of view as a true food. The reception
given to it by the stomach proves this very plainly. It is obviously an
unwelcome intruder. It cannot, like proper foods, be transformed into any
element or component of the human body, but passes on, innutritious and
for the most part unappropriated. Taken even into the mouth, by any person
not hardened to its use, its effect is so pungent and burning as at once
to demand its rejection. But if allowed to pass into the stomach, that
organ immediately rebels against its intrusion, and not unfrequently
ejects it with indignant emphasis. The burning sensation it produces
there, is only an appeal for water to dilute it.

The stomach meanwhile, in response to this fiery invitation, secretes from
its myriad pores its juices and watery fluids, to protect itself as much
as possible from the invading liquid. It does not digest alcoholic drinks;
we might say it does not attempt to, because they are not material
suitable for digestion, and also because no organ can perform its normal
work while smarting under an unnatural irritation.

Even if the stomach does not at once eject the poison, it refuses to
adopt it as food, for it does not pass along with the other food material,
as chyme, into the intestines, but is seized by the absorbents, borne into
the veins, which convey it to the heart, whence the pulmonary artery
conveys it to the lungs, where its presence is announced in the breath.
But wherever alcohol is carried in the tissues, it is always an irritant,
every organ in turn endeavoring to rid itself of the noxious material.

171. Effect of Alcoholic Liquor upon the Stomach. The methods by
which intoxicating drinks impair and often ruin digestion are various. We
know that a piece of animal food, as beef, if soaked in alcohol for a few
hours, becomes hard and tough, the fibers having been compacted together
because of the abstraction of their moisture by the alcohol, which has a
marvelous affinity for water. In the same way alcohol hardens and toughens
animal food in the stomach, condensing its fibers, and rendering it
indigestible, thus preventing the healthful nutrition of the body. So, if
alcohol be added to the clear, liquid white of an egg, it is instantly
coagulated and transformed into hard albumen. As a result of this
hardening action, animal food in contact with alcoholic liquids in the
stomach remains undigested, and must either be detained there so long as
to become a source of gastric disturbance, or else be allowed to pass
undigested through the pyloric gate, and then may become a cause of
serious intestinal disturbance.[27]

This peculiar property of alcohol, its greedy absorption of water from
objects in contact with it, acts also by absorbing liquids from the
surface of the stomach itself, thus hardening the delicate glands,
impairing their ability to absorb the food-liquids, and so inducing
gastric dyspepsia. This local injury inflicted upon the stomach by all
forms of intoxicants, is serious and protracted. This organ is, with
admirable wisdom, so constructed as to endure a surprising amount of
abuse, but it was plainly not intended to thrive on alcoholic liquids. The
application of fiery drinks to its tender surface produces at first a
marked congestion of its blood-vessels, changing the natural pink color,
as in the mouth, to a bright or deep red.

If the irritation be not repeated, the lining membrane soon recovers its
natural appearance. But if repeated and continued, the congestion becomes
more intense, the red color deeper and darker; the entire surface is the
subject of chronic inflammation, its walls are thickened, and sometimes
ulcerated. In this deplorable state, the organ is quite unable to perform
its normal work of digestion.[28]

172. Alcohol and the Gastric Juice. But still another destructive
influence upon digestion appears in the singular fact that alcohol
diminishes the power of the gastric juice to do its proper work. Alcohol
coagulates the pepsin, which is the dissolving element in this important
gastric fluid. A very simple experiment will prove this. Obtain a small
quantity of gastric juice from the fresh stomach of a calf or pig, by
gently pressing it in a very little water. Pour the milky juice into a
clear glass vessel, add a little alcohol, and a white deposit will
presently settle to the bottom. This deposit contains the pepsin of the
gastric juice, the potent element by which it does its special work of
digestion. The ill effect of alcohol upon it is one of the prime factors
in the long series of evil results from the use of intoxicants.

173. The Final Results upon Digestion. We have thus explained three
different methods by which alcoholic drinks exercise a terrible power for
harm; they act upon the food so as to render it less digestible; they
injure the stomach so as seriously to impair its power of digestion; and
they deprive the gastric juice of the one principal ingredient essential
to its usefulness.

Alcoholic drinks forced upon the stomach are a foreign substance; the
stomach treats them as such, and refuses to go on with the process of
digestion till it first gets rid of the poison. This irritating presence
and delay weaken the stomach, so that when proper food follows, the
enfeebled organ is ill prepared for its work. After intoxication, there
occurs an obvious reaction of the stomach, and digestive organs, against
the violent and unnatural disturbance. The appetite is extinguished or
depraved, and intense headache racks the frame, the whole system is
prostrated, as from a partial paralysis (all these results being the voice
of Nature's sharp warning of this great wrong), and a rest of some days
is needed before the system fully recovers from the injury inflicted.

It is altogether an error to suppose the use of intoxicants is necessary
or even desirable to promote appetite or digestion. In health, good food
and a stomach undisturbed by artificial interference furnish all the
conditions required. More than these is harmful. If it may sometimes seem
as if alcoholic drinks arouse the appetite and invigorate digestion, we
must not shut our eyes to the fact that this is only a seeming, and that
their continued use will inevitably ruin both. In brief, there is no more
sure foe to good appetite and normal digestion than the habitual use of
alcoholic liquors.

174. Effect of Alcoholic Drinks upon the Liver. It is to be noted
that the circulation of the liver is peculiar; that the capillaries of the
hepatic artery unite in the lobule with those of the portal vein, and thus
the blood from both sources is combined; and that the portal vein brings
to the liver the blood from the stomach, the intestines, and the spleen.
From the fact that alcohol absorbed from the stomach enters the portal
vein, and is borne directly to the liver, we would expect to find this
organ suffering the full effects of its presence. And all the more would
this be true, because we have just learned that the liver acts as a sort
of filter to strain from the blood its impurities. So the liver is
especially liable to diseases produced by alcoholics. Post mortems of
those who have died while intoxicated show a larger amount of alcohol in
the liver than in any other organ. Next to the stomach the liver is an
early and late sufferer, and this is especially the case with hard
drinkers, and even more moderate drinkers in hot climates. Yellow fever
occurring in inebriates is always fatal.

The effects produced in the liver are not so much functional as organic;
that is, not merely a disturbed mode of action, but a destruction of the
fabric of the organ itself. From the use of intoxicants, the liver
becomes at first irritated, then inflamed, and finally seriously diseased.
The fine bands, or septa, which serve as partitions between the hepatic
lobules, and so maintain the form and consistency of the organ, are the
special subjects of the inflammation. Though the liver is at first
enlarged, it soon becomes contracted; the secreting cells are compressed,
and are quite unable to perform their proper work, which indeed is a very
important one in the round of the digestion of food and the purification
of the blood. This contraction of the septa in time gives the whole organ
an irregularly puckered appearance, called from this fact a hob-nail liver
or, popularly, gin liver. The yellowish discoloration, usually from
retained or perverted bile, gives the disease the medical name of
cirrhosis.[29] It is usually accompanied with dropsy in the lower
extremities, caused by obstruction to the return of the circulation from
the parts below the liver. This disease is always fatal.


175. Fatty Degeneration Due to Alcohol. Another form of destructive
disease often occurs. There is an increase of fat globules deposited in
the liver, causing notable enlargement and destroying its function. This
is called fatty degeneration, and is not limited to the liver, but other
organs are likely to be similarly affected. In truth, this deposition of
fat is a most significant occurrence, as it means actual destruction of
the liver tissues,--nothing less than progressive death of the organ. This
condition always leads to a fatal issue. Still other forms of alcoholic
disease of the liver are produced, one being the excessive formation of
sugar, constituting what is known as a form of diabetes.

176. Effect of Tobacco on Digestion. The noxious influence of
tobacco upon the process of digestion is nearly parallel to the effects of
alcohol, which it resembles in its irritant and narcotic character.
Locally, it stimulates the secretion of saliva to an unnatural extent, and
this excess of secretion diminishes the amount available for normal
digestion.

Tobacco also poisons the saliva furnished for the digestion of food, and
thus at the very outset impairs, in both of these particulars, the general
digestion, and especially the digestion of the starchy portions of the
food. For this reason the amount of food taken, fails to nourish as it
should, and either more food must be taken, or the body becomes gradually
impoverished.

The poisonous _nicotine_, the active element of tobacco, exerts a
destructive influence upon the stomach digestion, enfeebling the vigor of
the muscular walls of that organ. These effects combined produce
dyspepsia, with its weary train of baneful results.

The tobacco tongue never presents the natural, clear, pink color, but
rather a dirty yellow, and is usually heavily coated, showing a disordered
stomach and impaired digestion. Then, too, there is dryness of the mouth,
an unnatural thirst that demands drink. But pure water is stale and flat
to such a mouth: something more emphatic is needed. Thus comes the
unnatural craving for alcoholic liquors, and thus are taken the first
steps on the downward grade.

"There is no doubt that tobacco predisposes to neuralgia, vertigo,
indigestion, and other affections of the nervous, circulatory and
digestive organs."--W. H. Hammond, the eminent surgeon of New York city
and formerly Surgeon General, U.S.A.

Drs. Seaver of Yale University and Hitchcock of Amherst College,
instructors of physical education in these two colleges, have clearly
demonstrated by personal examination and recorded statistics that the use
of tobacco among college students checks growth in weight, height,
chest-girth, and, most of all, in lung capacity.



Additional Experiments.

  Experiment 66. Test a portion of _C_ (Experiment 57) with solution
  of iodine; no blue color is obtained, as all the starch has disappeared,
  having been converted into a reducing sugar, or maltose.

  Experiment 67. Make a thick starch paste; place some in test tubes,
  labeled _A_ and _B_. Keep _A_ for comparison, and to _B_ add saliva, and
  expose both to about 104° F. _A_ is unaffected, while _B_ soon becomes
  fluid --within two minutes--and loses its opalescence; this liquefaction
  is a process quite antecedent to the saccharifying process which
  follows.

  Experiment 68. _To show the action of gastric juice on milk_. Mix
  two teaspoonfuls of fresh milk in a test tube with a few drops of
  neutral artificial gastric juice;[30] keep at about 100° F. In a short
  time the milk curdles, so that the tube can be inverted without the curd
  falling out. By and by _whey_ is squeezed out of the clot. The curdling
  of milk by the rennet ferment present in the gastric juice, is quite
  different from that produced by the "souring of milk," or by the
  precipitation of caseinogen by acids. Here the casein (carrying with it
  most of the fats) is precipitated in a neutral fluid.

  Experiment 69. To the test tube in the preceding experiment, add
  two teaspoonfuls of dilute hydrochloric acid, and keep at 100° F. for
  two hours. The pepsin in the presence of the acid digests the casein,
  gradually dissolving it, forming a straw-colored fluid containing
  peptones. The peptonized milk has a peculiar odor and bitter taste.

  Experiment 70. _To show the action of rennet on milk_. Place milk
  in a test tube, add a drop or two of commercial rennet, and place the
  tube in a water-bath at about 100° F. The milk becomes solid in a few
  minutes, forming a _curd_, and by and by the curd of casein contracts,
  and presses out a fluid,--the _whey_.

  Experiment 71. Repeat the experiment, but previously boil the
  rennet. No such result is obtained as in the preceding experiment,
  because the rennet ferment is destroyed by heat.

  Experiment 72. _To show the effect of the pancreatic ferment
  (trypsin) upon albuminous matter_. Half fill three test tubes, _A, B,
  C_, with one-per-cent solution of sodium carbonate, and add 5 drops of
  liquor pancreaticus, or a few grains of Fairchild's extract of pancreas,
  in each. Boil _B_, and make _C_ acid with dilute hydrochloric acid.
  Place in each tube an equal amount of well-washed fibrin, plug the tubes
  with absorbent cotton, and place all in a water-bath at about 100° F.

  Experiment 73. Examine from time to time the three test tubes in
  the preceding experiment. At the end of one, two, or three hours, there
  is no change in _B_ and _C_, while in _A_ the fibrin is gradually being
  eroded, and finally disappears; but it does not swell up, and the
  solution at the same time becomes slightly turbid. After three hours,
  still no change is observable in _B_ and _C_.

  Experiment 74. Filter _A_, and carefully neutralize the filtrate
  with very dilute hydrochloric or acetic acid, equal to a precipitate of
  alkali-albumen. Filter off the precipitate, and on testing the filtrate,
  peptones are found. The intermediate bodies, the albumoses, are not
  nearly so readily obtained from pancreatic as from gastric digests.

  Experiment 75. Filter _B_ and _C_, and carefully neutralize the
  filtrates. They give no precipitate. No peptones are found.

  Experiment 76. _To show the action of pancreatic juice upon the
  albuminous ingredients (casein) of milk_. Into a four-ounce bottle put
  two tablespoonfuls of cold water; add one grain of Fairchild's extract
  of pancreas, and as much baking soda as can be taken up on the point of
  a penknife. Shake well, and add four tablespoonfuls of cold, fresh milk.
  Shake again.

  Now set the bottle into a basin of hot water (as hot as one can bear the
  hand in), and let it stand for about forty-five minutes. While the milk
  is digesting, take a small quantity of milk in a goblet, and stir in ten
  drops or more of vinegar. A thick curd of casein will be seen.

  Upon applying the same test to the digested milk, no curd will be made.
  This is because the pancreatic ferment (trypsin) has digested the casein
  into "peptone," which does not curdle. This digested milk is therefore
  called "peptonized milk."

  Experiment 77. _To show the action of bile_. Obtain from the
  butcher some ox bile. Note its bitter taste, peculiar odor, and greenish
  color. It is alkaline or neutral to litmus paper. Pour it from one
  vessel to another, and note that strings of mucin (from the lining
  membrane of the gall bladder) connect one vessel with the other. It is
  best to precipitate the mucin by acetic acid before making experiments;
  and to dilute the clear liquid with a little distilled water.

  Experiment 78. _Test for bile pigments_. Place a few drops of bile
  on a white porcelain slab. With a glass rod place a drop or two of
  strong nitric acid containing nitrous acid near the drop of bile; bring
  the acid and bile into contact. Notice the succession of colors,
  beginning with green and passing into blue, red, and yellow.

  Experiment 79. _To show the action of bile on fats_. Mix three
  teaspoonfuls of bile with one-half a teaspoonful of almond oil, to which
  some oleic acid is added. Shake well, and keep the tube in a water-bath
  at about 100° F. A very good emulsion is obtained.

  Experiment 80. _To show that bile favors filtration and the
  absorption of fats_. Place two small funnels of exactly the same size in
  a filter stand, and under each a beaker. Into each funnel put a filter
  paper; moisten the one with water (_A_) and the other with bile (_B_).
  Pour into each an equal volume of almond oil; cover with a slip of glass
  to prevent evaporation. Set aside for twelve hours, and note that the
  oil passes through _B_, but scarcely any through _A_. The oil filters
  much more readily through the one moistened with bile, than through the
  one moistened with water.


Experiments with the Fats.

  Experiment 81. Use olive oil or lard. Show by experiment that they
  are soluble in ether, chloroform and hot water, but insoluble in water
  alone.

  Experiment 82. Dissolve a few drops of oil or fat in a teaspoonful
  of ether. Let a drop of the solution fall on a piece of tissue or rice
  paper. Note the greasy stain, which does not disappear with the heat.

  Experiment 83. Pour a little cod-liver oil into a test tube; add a
  few drops of a dilute solution of sodium carbonate. The whole mass
  becomes white, making an emulsion.

  Experiment 84. Shake up olive oil with a solution of albumen in a
  test tube. Note that an emulsion is formed.




Chapter VII.

The Blood and Its Circulation.



177. The Circulation. All the tissues of the body are traversed by
exceedingly minute tubes called capillaries, which receive the blood from
the arteries, and convey it to the veins. These capillaries form a great
system of networks, the meshes of which are filled with the elements of
the various tissues. That is, the capillaries are closed vessels, and the
tissues lie outside of them, as asbestos packing may be used to envelop
hot-water pipes. The space between the walls of the capillaries and the
cells of the tissues is filled with lymph. As the blood flows along
the capillaries, certain parts of the plasma of the blood filter through
their walls into the lymph, and certain parts of the lymph filter through
the cell walls of the tissues and mingle with the blood current. The lymph
thus acts as a medium of exchange, in which a transfer of material takes
place between the blood in the capillaries and the lymph around them. A
similar exchange of material is constantly going on between the lymph and
the tissues themselves.

This, then, we must remember,--that in every tissue, so long as the blood
flows, and life lasts, this exchange takes place between the blood within
the capillaries and the tissues without.

The stream of blood _to_ the tissues carries to them the material,
including the all-important oxygen, with which they build themselves up
and do their work. The stream _from_ the tissues carries into the blood
the products of certain chemical changes which have taken place in these
tissues. These products may represent simple waste matter to be cast out
or material which may be of use to some other tissue.

In brief, the tissues by the help of the lymph live on the blood.
Just as our bodies, as a whole, live on the things around us, the food and
the air, so do the bodily tissues live on the blood which bathes them in
an unceasing current, and which is their immediate air and food.


178. Physical Properties of Blood. The blood has been called the
life of the body from the fact that upon it depends our bodily existence.
The blood is so essentially the nutrient element that it is called
sometimes very aptly "liquid flesh." It is a red, warm, heavy, alkaline
fluid, slightly salt in taste, and has a somewhat fetid odor. Its color
varies from bright red in the arteries and when exposed to the air, to
various tints from dark purple to red in the veins. The color of the blood
is due to the coloring constituent of the red corpuscles, _hæmoglobin_,
which is brighter or darker as it contains more or less oxygen.

[Illustration: Fig. 65.--Blood Corpuscles of Various Animals. (Magnified
to the same scale.)

  A, from proteus, a kind of newt;
  B, salamander;
  C, frog;
  D, frog after addition of acetic acid, showing the central nucleus;
  E, bird;
  F, camel;
  G, fish;
  H, crab or other invertebrate animal
]

The temperature of the blood varies slightly in different parts of the
circulation. Its average heat near the surface is in health about the
same, _viz_. 98½° F. Blood is alkaline, but outside of the body it soon
becomes neutral, then acid. The chloride of sodium, or common salt, which
the blood contains, gives it a salty taste. In a hemorrhage from the
lungs, the sufferer is quick to notice in the mouth the warm and saltish
taste. The total amount of the blood in the body was formerly greatly
overestimated. It is about 1/13 of the total weight of the body, and in a
person weighing 156 pounds would amount to about 12 pounds.

179. Blood Corpuscles. If we put a drop of blood upon a glass slide,
and place upon it a cover of thin glass, we can flatten it out until the
color almost disappears. If we examine this thin film with a microscope,
we see that the blood is not altogether fluid. We find that the liquid
part, or plasma, is of a light straw color, and has floating in it a
multitude of very minute bodies, called corpuscles. These are of two
kinds, the red and the colorless. The former are much more
numerous, and have been compared somewhat fancifully to countless myriads
of tiny fishes in a swiftly flowing stream.

180. Red Corpuscles. The red corpuscles are circular disks about
1/3200 of an inch in diameter, and double concave in shape. They tend to
adhere in long rolls like piles of coins. They are soft, flexible, and
elastic, readily squeezing through openings and passages narrower than
their own diameter, then at once resuming their own shape.

The red corpuscles are so very small, that rather more than ten millions
of them will lie on a surface one inch square. Their number is so enormous
that, if all the red corpuscles in a healthy person could be arranged in a
continuous line, it is estimated that they would reach four times around
the earth! The principal constituent of these corpuscles, next to water,
and that which gives them color is _hæmoglobin_, a compound containing
iron. As all the tissues are constantly absorbing oxygen, and giving off
carbon dioxid, a very important office of the red corpuscles is to carry
oxygen to all parts of the body.

181. Colorless Corpuscles. The colorless corpuscles are larger
than the red, their average diameter being about 1/2500 of an inch. While
the red corpuscles are regular in shape, and float about, and tumble
freely over one another, the colorless are of irregular shape, and stick
close to the glass slide on which they are placed. Again, while the red
corpuscles are changed only by some influence from without, as pressure
and the like, the colorless corpuscles spontaneously undergo active and
very curious changes of form, resembling those of the amœba, a very
minute organism found in stagnant water (Fig. 2).

The number of both red and colorless corpuscles varies a great deal from
time to time. For instance, the number of the latter increases after
meals, and quickly diminishes. There is reason to think both kinds of
corpuscles are continually being destroyed, their place being supplied by
new ones. While the action of the colorless corpuscles is important to the
lymph and the chyle, and in the coagulation of the blood, their real
function has not been ascertained.

[Illustration: Fig. 66.--Blood Corpuscles of Man.

  A, red corpuscles;
  B, the same seen edgeways;
  C, the same arranged in rows;
  D, white corpuscles with nuclei.
]

  Experiment 85. _To show the blood corpuscles_. A moderately
  powerful microscope is necessary to examine blood corpuscles. Let a
  small drop of blood (easily obtained by pricking the finger with a
  needle) be placed upon a clean slip of glass, and covered with thin
  glass, such as is ordinarily used for microscopic purposes.

  The blood is thus spread out into a film and may be readily examined. At
  first the red corpuscles will be seen as pale, disk-like bodies floating
  in the clear fluid. Soon they will be observed to stick to each other by
  their flattened faces, so as to form rows. The colorless corpuscles are
  to be seen among the red ones, but are much less numerous.

182. The Coagulation of the Blood. Blood when shed from the living
body is as fluid as water. But it soon becomes viscid, and flows less
readily from one vessel to another. Soon the whole mass becomes a nearly
solid jelly called a clot. The vessel containing it even can be
turned upside down, without a drop of blood being spilled. If carefully
shaken out, the mass will form a complete mould of the vessel.

At first the clot includes the whole mass of blood, takes the shape of
the vessel in which it is contained, and is of a uniform color. But in a
short time a pale yellowish fluid begins to ooze out, and to collect on
the surface. The clot gradually shrinks, until at the end of a few hours
it is much firmer, and floats in the yellowish fluid. The white corpuscles
become entangled in the upper portion of clot, giving it a pale yellow
look on the top, known as the _buffy coat_. As the clot is attached to the
sides of the vessel, the shrinkage is more pronounced toward the center,
and thus the surface of the clot is hollowed or _cupped_, as it is called.
This remarkable process is known as coagulation, or the clotting of
blood; and the liquid which separates from the clot is called serum.
The serum is almost entirely free from corpuscles, these being entangled
in the fibrin.

[Illustration: Fig. 67.--Diagram of Clot with Buffy Coat.

  A, serum;
  B, cupped upper surface of clot;
  C, white corpuscles in upper layer of clot;
  D, lower portion of clot with red corpuscles.
]

This clotting of the blood is due to the formation in the blood, after it
is withdrawn from the living body, of a substance called fibrin.[31]
It is made up of a network of fine white threads, running in every
direction through the plasma, and is a proteid substance. The coagulation
of the blood may be retarded, and even prevented, by a temperature below
40° F., or a temperature above 120° F. The addition of common salt also
prevents coagulation. The clotting of the blood may be hastened by free
access to air, by contact with roughened surfaces, or by keeping it at
perfect rest.

This power of coagulation is of the most vital importance. But for this,
a very small cut might cause bleeding sufficient to empty the
blood-vessels, and death would speedily follow. In slight cuts, Nature
plugs up the wound with clots of blood, and thus prevents excessive
bleeding. The unfavorable effects of the want of clotting are illustrated
in some persons in whom bleeding from even the slightest wounds continues
till life is in danger. Such persons are called "bleeders," and surgeons
hesitate to perform on them any operation, however trivial, even the
extraction of a tooth being often followed by an alarming loss of blood.

  Experiment 86. A few drops of fresh blood may be easily obtained to
  illustrate important points in the physiology of blood, by tying a
  string tight around the finger, and piercing it with a clean needle. The
  blood runs freely, is red and opaque. Put two or three drops of fresh
  blood on a sheet of white paper, and observe that it looks yellowish.

  Experiment 87. Put two or three drops of fresh blood on a white
  individual butter plate inverted in a saucer of water. Cover it with an
  inverted goblet. Take off the cover in five minutes, and the drop has
  set into a jelly-like mass. Take it off in half an hour, and a little
  clot will be seen in the watery serum.

  Experiment 88. _To show the blood-clot._ Carry to the slaughter
  house a clean, six or eight ounce, wide-mouthed bottle. Fill it with
  fresh blood. Carry it home with great care, and let it stand over night.
  The next day the clot will be seen floating in the nearly colorless
  serum.

  Experiment 89. Obtain a pint of fresh blood; put it into a bowl,
  and whip it briskly for five minutes, with a bunch of dry twigs. Fine
  white threads of fibrin collect on the twigs, the blood remaining fluid.
  This is "whipped" or defibrinated blood, which has lost the power of
  coagulating spontaneously.

183. General Plan of Circulation. All the tissues of the body depend
upon the blood for their nourishment. It is evident then that this vital
fluid must be continually renewed, else it would speedily lose all of its
life-giving material. Some provision, then, is necessary not only to have
the blood renewed in quantity and quality, but also to enable it to carry
away impurities.

So we must have an apparatus of circulation. We need first a central
pump from which branch off large pipes, which divide into smaller and
smaller branches until they reach the remotest tissues. Through these
pipes the blood must be pumped and distributed to the whole body. Then we
must have a set of return pipes by which the blood, after it has carried
nourishment to the tissues, and received waste matters from them, shall be
brought back to the central pumping station, to be used again. We must
have also some apparatus to purify the blood from the waste matter it has
collected.

[Illustration: Fig. 68.--Anterior View of the Heart.

  A, superior vena cava;
  B, right auricle;
  C, right ventricle;
  D, left ventricle;
  E, left auricle;
  F, pulmonary vein;
  H, pulmonary artery;
  K, aorta;
  L, right subclavian artery;
  M, right common carotid artery;
  N, left common carotid artery.
]

This central pump is the heart. The pipes leading from it and
gradually growing smaller and smaller are the arteries. The very
minute vessels into which they are at last subdivided are
capillaries. The pipes which convey the blood back to the heart are
the veins. Thus, the arteries end in the tissues in fine, hair-like
vessels, the capillaries; and the veins begin in the tissues in
exceedingly small tubes,--the capillaries. Of course, there can be no
break in the continuity between the arteries and the vein. The apparatus
of circulation is thus formed by the heart, the arteries, the
capillaries, and the veins.

184. The Heart. The heart is a pear-shaped, muscular organ
roughly estimated as about the size of the persons closed fist. It lies in
the chest behind the breastbone, and is, lodged between the lobes of the
lungs, which partly cover it. In shape the heart resembles a cone, the
base of which is directed upwards, a little backwards, and to the right
side, while the apex is pointed downwards, forwards, and to the left side.
During life, the apex of the heart beats against the chest wall in
the space between the fifth and sixth ribs, and about an inch and a half
to the left of the middle line of the body. The beating of the heart can
be readily felt, heard, and often seen moving the chest wall as it strikes
against it.

[Illustration: Fig. 69.--Diagram illustrating the Structure of a Serous
Membrane.

  A, the viscus, or organ, enveloped by serous membrane;
  B, layer of membrane lining cavity;
  C, membrane reflected to envelop viscus;
  D, outer layer of viscus, with blood-vessels at
  E communicating with the general circulation.
]

The heart does not hang free in the chest, but is suspended and kept in
position to some extent by the great vessels connected with it. It is
enclosed in a bell-shaped covering called the pericardium. This is
really double, with two layers, one over another. The inner or serous
layer covers the external surface of the heart, and is reflected back upon
itself in order to form, like all membranes of this kind, a sac without an
opening.[32] The heart is thus covered by the pericardial sac, but
is not contained inside its cavity. The space between the two membranes is
filled with serous fluid. This fluid permits the heart and the pericardium
to glide upon one another with the least possible amount of friction.[33]

The heart is a hollow organ, but the cavity is divided into two parts by a
muscular partition forming a left and a right side, between which there is
no communication. These two cavities are each divided by a horizontal
partition into an upper and a lower chamber. These partitions, however,
include a set of valves which open like folding doors between the two
rooms. If these doors are closed there are two separate rooms, but if open
there is practically only one room. The heart thus has four chambers, two
on each side. The two upper chambers are called auricles from their
supposed resemblance to the ear. The two lower chambers are called
ventricles, and their walls form the chief portion of the muscular
substance of the organ. There are, therefore, the right and left auricles,
with their thin, soft walls, and the right and left ventricles, with their
thick and strong walls.

185. The Valves of the Heart. The heart is a valvular pump, which
works on mechanical principles, the motive power being supplied by the
contraction of its muscular fibers. Regarding the heart as a pump, its
valves assume great importance. They consist of thin, but strong,
triangular folds of tough membrane which hang down from the edges of the
passages into the ventricles. They may be compared to swinging curtains
which, by opening only one way, allow the blood to flow from the auricles
to the ventricles, but by instantly folding back prevent its return.

[Illustration: Fig. 70.--Lateral Section of the Right Chest. (Showing the
relative position of the heart and its great vessels, the œsophagus
and trachea.)

  A, inferior constrictor muscle (aids in conveying food down the
     œsophagus);
  B, œsophagus;
  C, section of the right bronchus;
  D, two right pulmonary veins;
  E, great azygos vein crossing œsophagus and right bronchus to empty
     into the superior vena cava;
  F, thoracic duct;
  H, thoracic aorta;
  K, lower portion of œsophagus passing through the diaphragm;
  L, diaphragm as it appears in sectional view, enveloping the heart;
  M, inferior vena cava passing through diaphragm and emptying into
     auricle;
  N, right auricle;
  O, section of right branch of the pulmonary artery;
  P, aorta;
  R, superior vena cava;
  S, trachea.
]

The valve on the right side is called the tricuspid, because it
consists of three little folds which fall over the opening and close it,
being kept from falling too far by a number of slender threads called
chordæ tendinæ. The valve on the left side, called the mitral,
from its fancied resemblance to a bishop's mitre, consists of two folds
which close together as do those of the tricuspid valve.

The slender cords which regulate the valves are only just long enough to
allow the folds to close together, and no force of the blood pushing
against the valves can send them farther back, as the cords will not
stretch The harder the blood in the ventricles pushes back against the
valves, the tighter the cords become and the closer the folds are brought
together, until the way is completely closed.

From the right ventricle a large vessel called the pulmonary artery
passes to the lungs, and from the left ventricle a large vessel called the
aorta arches out to the general circulation of the body. The openings
from the ventricles into these vessels are guarded by the semilunar
valves. Each valve has three folds, each half-moon-shaped, hence the
name semilunar. These valves, when shut, prevent any backward flow of the
blood on the right side between the pulmonary artery and the right
ventricle, and on the left side between the aorta and the left ventricle.

[Illustration: Fig. 71.--Right Cavities of the Heart.

  A, aorta;
  B, superior vena cava;
  C, C, right pulmonary veins;
  D, inferior vena cava;
  E, section of coronary vein;
  F, right ventricular cavity;
  H, posterior curtain of the tricuspid valve;
  K, right auricular cavity;
  M, fossa ovalis, oval depression, partition between the auricles formed
     after birth.
]

186. General Plan of the Blood-vessels Connected with the Heart.
There are numerous blood-vessels connected with the heart, the relative
position and the use of which must be understood. The two largest veins in
the body, the superior vena cava and the inferior vena cava,
open into the right auricle. These two veins bring venous blood from all
parts of the body, and pour it into the right auricle, whence it passes
into the right ventricle.

From the right ventricle arises one large vessel, the pulmonary
artery, which soon divides into two branches of nearly equal size, one
for the right lung, the other for the left. Each branch, having reached
its lung, divides and subdivides again and again, until it ends in
hair-like capillaries, which form a very fine network in every part of the
lung. Thus the blood is pumped from the right ventricle into the pulmonary
artery and distributed throughout the two lungs (Figs. 86 and 88).

We will now turn to the left side of the heart, and notice the general
arrangement of its great vessels. Four veins, called the pulmonary
veins, open into the left auricle, two from each lung. These veins
start from very minute vessels the continuation of the capillaries of the
pulmonary artery. They form larger and larger vessels until they become
two large veins in each lung, and pour their contents into the left
auricle. Thus the pulmonary artery carries venous blood from the right
ventricle _to_ the lungs, as the pulmonary veins carry arterial blood
_from_ the lungs to the left auricle.

From the left ventricle springs the largest arterial trunk in the body,
over one-half of an inch in diameter, called the aorta. From the
aorta other arteries branch off to carry the blood to all parts of the
body, only to be again brought back by the veins to the right side,
through the cavities of the ventricles. We shall learn in Chapter VIII.
that the main object of pumping the blood into the lungs is to have it
purified from certain waste matters which it has taken up in its course
through the body, before it is again sent on its journey from the left
ventricle.


187. The Arteries. The blood-vessels are flexible tubes through which
the blood is borne through the body. There are three kinds,--the
arteries, the veins, and the capillaries, and these differ
from one another in various ways.

The arteries are the highly elastic and extensible tubes which carry
the pure, fresh blood outwards from the heart to all parts of the body.
They may all be regarded as branches of the aorta. After the aorta leaves
the left ventricle it rises towards the neck, but soon turns downwards,
making a curve known as the arch of the aorta.

From the arch are given off the arteries which supply the head and arms
with blood. These are the two carotid arteries, which run up on each
side of the neck to the head, and the two subclavian arteries, which
pass beneath the collar bone to the arms. This great arterial trunk now
passes down in front of the spine to the pelvis, where it divides into two
main branches, which supply the pelvis and the lower limbs.

The descending aorta, while passing downwards, gives off arteries to the
different tissues and organs. Of these branches the chief are the
coeliac artery, which subdivides into three great branches,--one
each to supply the stomach, the liver, and the spleen; then the renal
arteries, one to each kidney; and next two others, the mesenteric
arteries, to the intestines. The aorta at last divides into two main
branches, the common iliac arteries, which, by their subdivisions,
furnish the arterial vessels for the pelvis and the lower limbs.

[Illustration: Fig. 72.--Left Cavities of the Heart.

  A, B, right pulmonary veins;
  with S, openings of the veins;
  E, D, C, aortic valves;
  R, aorta;
  P, pulmonary artery;
  O, pulmonic valves;
  H, mitral valve;
  K, columnæ carnoeæ;
  M, right ventricular cavity;
  N, interventricular septum.
]

The flow of blood in the arteries is caused by the muscular force of the
heart, aided by the elastic tissues and muscular fibers of the arterial
walls, and to a certain extent by the muscles themselves. Most of the
great arterial trunks lie deep in the fleshy parts of the body; but their
branches are so numerous and become so minute that, with a few exceptions,
they penetrate all the tissues of the body,--so much so, that the point
of the finest needle cannot be thrust into the flesh anywhere without
wounding one or more little arteries and thus drawing blood.


188. The Veins. The veins are the blood-vessels which carry the
impure blood from the various tissues of the body to the heart. They begin
in the minute capillaries at the extremities of the four limbs, and
everywhere throughout the body, and passing onwards toward the heart,
receive constantly fresh accessions on the way from myriad other veins
bringing blood from other wayside capillaries, till the central veins
gradually unite into larger and larger vessels until at length they form
the two great vessels which open into the right auricle of the heart.

These two great venous trunks are the inferior vena cava, bringing
the blood from the trunk and the lower limbs, and the superior vena
cava, bringing the blood from the head and the upper limbs. These two
large trunks meet as they enter the right auricle. The four pulmonary
veins, as we have learned, carry the arterial blood from the lungs to
the left auricle.

[Illustration: Fig. 73.

  A, part of a vein laid open, with two pairs of valves;
  B, longitudinal section of a vein, showing the valves closed.
]

A large vein generally accompanies its corresponding artery, but most
veins lie near the surface of the body, just beneath the skin. They may be
easily seen under the skin of the hand and forearm, especially in aged
persons. If the arm of a young person is allowed to hang down a few
moments, and then tightly bandaged above the elbow to retard the return of
the blood, the veins become large and prominent.

The walls of the larger veins, unlike arteries, contain but little of
either elastic or muscular tissue; hence they are thin, and when empty
collapse. The inner surfaces of many of the veins are supplied with
pouch-like folds, or pockets, which act as valves to impede the backward
flow of the blood, while they do not obstruct blood flowing forward toward
the heart. These valves can be shown by letting the forearm hang down, and
sliding the finger upwards over the veins (Fig. 73).

The veins have no force-pump, like the arteries, to propel their contents
towards their destination. The onward flow of the blood in them is due to
various causes, the chief being the pressure behind of the blood pumped
into the capillaries. Then as the pocket-like valves prevent the backward
flow of the blood, the pressure of the various muscles of the body urges
along the blood, and thus promotes the onward flow.

The forces which drive the blood through the arteries are sufficient to
carry the blood on through the capillaries. It is calculated that the
onward flow in the capillaries is about 1/50 to 1/33 of an inch in a
second, while in the arteries the blood current flows about 16 inches in a
second, and in the great veins about 4 inches every second.

[Illustration: Fig. 74.--The Structure of Capillaries.

Capillaries of various sizes, showing cells with nuclei]

189. The Capillaries. The capillaries are the minute, hair-like
tubes, with very thin walls, which form the connection between the ending
of the finest arteries and the beginning of the smallest veins. They are
distributed through every tissue of the body, except the epidermis and its
products, the epithelium, the cartilages, and the substance of the teeth.
In fact, the capillaries form a network of the tiniest blood-vessels, so
minute as to be quite invisible, at least one-fourth smaller than the
finest line visible to the naked eye.

The capillaries serve as a medium to transmit the blood from the arteries
to the veins; and it is through them that the blood brings nourishment to
the surrounding tissues. In brief, we may regard the whole body as
consisting of countless groups of little islands surrounded by
ever-flowing streams of blood. The walls of the capillaries are of the
most delicate structure, consisting of a single layer of cells loosely
connected. Thus there is allowed the most free interchange between the
blood and the tissues, through the medium of the lymph.

The number of the capillaries is inconceivable. Those in the lungs alone,
placed in a continuous line, would reach thousands of miles. The thin
walls of the capillaries are admirably adapted for the important
interchanges that take place between the blood and the tissues.

190. The Circulation of the Blood. It is now well to study the
circulation as a whole, tracing the course of the blood from a
certain point until it returns to the same point. We may conveniently
begin with the portion of blood contained at any moment in the right
auricle. The superior and inferior venæ cavæ are busily filling the
auricle with dark, impure blood. When it is full, it contracts. The
passage leading to the right ventricle lies open, and through it the blood
pours till the ventricle is full. Instantly this begins, in its turn, to
contract. The tricuspid valve at once closes, and blocks the way backward.
The blood is now forced through the open semilunar valves into the
pulmonary artery.

The pulmonary artery, bringing venous blood, by its alternate expansion
and recoil, draws the blood along until it reaches the pulmonary
capillaries. These tiny tubes surround the air cells of the lungs, and
here an exchange takes place. The impure, venous blood here gives up its
_débris_ in the shape of carbon dioxid and water, and in return takes up a
large amount of oxygen. Thus the blood brought to the lungs by the
pulmonary arteries leaves the lungs entirely different in character and
appearance. This part of the circulation is often called the lesser or
pulmonic circulation.

The four pulmonary veins bring back bright, scarlet blood, and pour it
into the left auricle of the heart, whence it passes through the mitral
valve into the left ventricle. As soon as the left ventricle is full, it
contracts. The mitral valve instantly closes and blocks the passage
backward into the auricle; the blood, having no other way open, is forced
through the semilunar valves into the aorta. Now red in color from its
fresh oxygen, and laden with nutritive materials, it is distributed by the
arteries to the various tissues of the body. Here it gives up its oxygen,
and certain nutritive materials to build up the tissues, and receives
certain products of waste, and, changed to a purple color, passes from the
capillaries into the veins.

[Illustration: Fig. 75.--Diagram illustrating the Circulation.

  1, right auricle;
  2, left auricle;
  3, right ventricle;
  4, left ventricle;
  5, vena cava superior;
  6, vena cava inferior;
  7, pulmonary arteries;
  8, lungs;
  9, pulmonary veins;
  10, aorta;
  11, alimentary canal;
  12, liver;
  13, hepatic artery;
  14, portal vein;
  15, hepatic vein.
]


All the veins of the body, except those from the lungs and the heart
itself, unite into two large veins, as already described, which pour their
contents into the right auricle of the heart, and thus the grand round of
circulation is continually maintained. This is called the systemic
circulation. The whole circuit of the blood is thus divided into two
portions, very distinct from each other.

191. The Portal Circulation. A certain part of the systemic or
greater circulation is often called the portal circulation, which
consists of the flow of the blood from the abdominal viscera through the
portal vein and liver to the hepatic vein. The blood brought to the
capillaries of the stomach, intestines, spleen, and pancreas is gathered
into veins which unite into a single trunk called the portal vein.
The blood, thus laden with certain products of digestion, is carried to
the liver by the portal vein, mingling with that supplied to the
capillaries of the same organ by the hepatic artery. From these
capillaries the blood is carried by small veins which unite into a large
trunk, the hepatic vein, which opens into the inferior vena cava. The
portal circulation is thus not an independent system, but forms a kind of
loop on the systemic circulation.

The lymph-current is in a sense a slow and stagnant side stream of
the blood circulation; for substances are constantly passing from the
blood-vessels into the lymph spaces, and returning, although after a
comparatively long interval, into the blood by the great lymphatic trunks.

  Experiment 90. _To illustrate the action of the heart, and how it
  pumps the blood in only one direction_. Take a Davidson or Household
  rubber syringe. Sink the suction end into water, and press the bulb. As
  you let the bulb expand, it fills with water; as you press it again, a
  valve prevents the water from flowing back, and it is driven out in a
  jet along the other pipe. The suction pipe represents the veins; the
  bulb, the heart; and the tube end, out of which the water flows, the
  arteries.

    [NOTE. The heart is not nourished by the blood which passes through
    it. The muscular substance of the heart itself is supplied with
    nourishment by two little arteries called the _coronary arteries_,
    which start from the aorta just above two of the semilunar valves. The
    blood is returned to the right auricle (not to either of the venæ
    cavæ) by the _coronary vein_.]

The longest route a portion of blood may take from the moment it leaves
the left ventricle to the moment it returns to it, is through the portal
circulation. The shortest possible route is through the substance of the
heart itself. The mean time which the blood requires to make a complete
circuit is about 23 seconds.

192. The Rhythmic Action of the Heart. To maintain a steady flow of
blood throughout the body the action of the heart must be regular and
methodical. The heart does not contract as a whole. The two auricles
contract at the same time, and this is followed at once by the contraction
of the two ventricles. While the ventricles are contracting, the auricles
begin to relax, and after the ventricles contract they also relax. Now
comes a pause, or rest, after which the auricles and ventricles contract
again in the same order as before, and their contractions are followed by
the same pause as before. These contractions and relaxations of the
various parts of the heart follow one another so regularly that the result
is called the rhythmic action of the heart.

The average number of beats of the heart, under normal conditions, is from
65 to 75 per minute. Now the time occupied from the instant the auricles
begin to contract until after the contraction of the ventricles and the
pause, is less than a second. Of this time one-fifth is occupied by the
contraction of the auricles, two-fifths by the contraction of the
ventricles, and the time during which the whole heart is at rest is
two-fifths of the period.

193. Impulse and Sounds of the Heart. The rhythmic action of the
heart is attended with various occurrences worthy of note. If the hand be
laid flat over the chest wall on the left, between the fifth and sixth
ribs, the heart will be felt beating. This movement is known as the
beat or impulse of the heart, and can be both seen and felt on
the left side. The heart-beat is unusually strong during active bodily
exertion, and under mental excitement.

The impulse of the heart is due to the striking of the lower, tense part
of the ventricles--the apex of the heart--against the chest wall at the
moment of their vigorous contraction. It is important for the physician to
know the exact place where the heart-beat should be felt, for the heart
may be displaced by disease, and its impulse would indicate its new
position.

Sounds also accompany the heart's action. If the ear be applied over the
region of the heart, two distinct sounds will be heard following one
another with perfect regularity. Their character may be tolerably imitated
by pronouncing the syllables _lubb_, _dŭp_. One sound is heard
immediately after the other, then there is a pause, then come the two
sounds again. The first is a dull, muffled sound, known as the "first
sound," followed at once by a short and sharper sound, known as the
"second sound" of the heart.

The precise cause of the first sound is still doubtful, but it is made at
the moment the ventricles contract. The second sound is, without doubt,
caused by the sudden closure of the semilunar valves of the pulmonary
artery and the aorta, at the moment when the contraction of the ventricles
is completed.

[Illustration: Fig. 76.--Muscular Fibers of the Ventricles.

  A, superficial fibers common to both ventricles;
  B, fibers of the left ventricle;
  C, deep fibers passing upwards toward the base of the heart;
  D, fibers penetrating the left ventricle
]

The sounds of the heart are modified or masked by blowing "murmurs" when
the cardiac orifices or valves are roughened, dilated, or otherwise
affected as the result of disease. Hence these new sounds may often afford
indications of the greatest importance to physicians in the diagnosis of
heart-disease.

194. The Nervous Control of the Heart. The regular, rhythmic movement
of the heart is maintained by the action of certain nerves. In various
places in the substance of the heart are masses of nerve matter, called
ganglia. From these ganglia there proceed, at regular intervals,
discharges of nerve energy, some of which excite movement, while others
seem to restrain it. The heart would quickly become exhausted if the
exciting ganglia had it all their own way, while it would stand still if
the restraining ganglia had full sway. The influence of one, however,
modifies the other, and the result is a moderate and regular activity of
the heart.

The heart is also subject to other nerve influences, but from outside of
itself. Two nerves are connected with the heart, the pneumogastric
and the sympathetic (secs. 271 and 265). The former appears to be
connected with the restraining ganglia; the latter with the exciting
ganglia. Thus, if a person were the subject of some emotion which caused
fainting, the explanation would be that the impression had been conveyed
to the brain, and from the brain to the heart by the pneumogastric nerves.
The result would be that the heart for an instant ceases to beat. Death
would be the result if the nerve influence were so great as to restrain
the movements of the heart for any appreciable time.

Again, if the person were the subject of some emotion by which the heart
were beating faster than usual, it would mean that there was sent from the
brain to the heart by the sympathetic nerves the impression which
stimulated it to increased activity.

195. The Nervous Control of the Blood-vessels. The tone and caliber
of the blood-vessels are controlled by certain vaso-motor nerves,
which are distributed among the muscular fibers of the walls. These nerves
are governed from a center in the medulla oblongata, a part of the brain
(sec. 270). If the nerves are stimulated more than usual, the muscular
walls contract, and the quantity of the blood flowing through them and the
supply to the part are diminished. Again, if the stimulus is less than
usual, the vessels dilate, and the supply to the part is increased.

Now the vaso-motor center may be excited to increased activity by
influences reaching it from various parts of the body, or even from the
brain itself. As a result, the nerves are stimulated, and the vessels
contract. Again, the normal influence of the vaso-motor center may be
suspended for a time by what is known as the inhibitory or
restraining effect. The result is that the tone of the blood-vessels
becomes diminished, and their channels widen.

The effect of this power of the nervous system is to give it a certain
control over the circulation in particular parts. Thus, though the force
of the heart and the general average blood-pressure remain the same, the
state of the circulation may be very different in different parts of the
body. The importance of this local control over the circulation is of the
utmost significance. Thus an organ at work needs to be more richly
supplied with blood than when at rest. For example, when the salivary
glands need to secrete saliva, and the stomach to pour out gastric juice,
the arteries that supply these organs are dilated, and so the parts are
flushed with an extra supply of blood, and thus are aroused to greater
activity.

Again, the ordinary supply of blood to a part may be lessened, so that the
organ is reduced to a state of inactivity, as occurs in the case of the
brain during sleep. We have in the act of blushing a visible example of
sudden enlargement of the smaller arteries of the face and neck, called
forth by some mental emotion which acts on the vaso-motor center and
diminishes its activity. The reverse condition occurs in the act of
turning pale. Then the result of the mental emotion is to cause the
vaso-motor nerves to exercise a more powerful control over the
capillaries, thereby closing them, and thus shutting off the flow of
blood.

  Experiment 91. Hold up the ear of a white rabbit against the light
  while the animal is kept quiet and not alarmed. The red central artery
  can be seen coursing along the translucent organ, giving off branches
  which by subdivision become too small to be separately visible, and the
  whole ear has a pink color and is warm from the abundant blood flowing
  through it. Attentive observation will show also that the caliber of the
  main artery is not constant; at somewhat irregular periods of a minute
  or more it dilates and contracts a little.

[Illustration: Fig. 77.--Some of the Principal Organs of the Chest and
Abdomen. (Blood vessels on the left, muscles on the right.)]

In brief, all over the body, the nervous system, by its vaso-motor
centers, is always supervising and regulating the distribution of blood in
the body, sending now more and now less to this or that part.

[Illustration: Fig. 78.--Capillary Blood-Vessels in the Web of a Frog's
Foot, as seen with the Microscope.]

196. The Pulse. When the finger is placed on any part of the body
where an artery is located near the surface, as, for example, on the
radial artery near the wrist, there is felt an intermittent pressure,
throbbing with every beat of the heart. This movement, frequently visible
to the eye, is the result of the alternate expansion of the artery by the
wave of blood, and the recoil of the arterial walls by their elasticity.
In other words, it is the wave produced by throwing a mass of blood into
the arteries already full. The blood-wave strikes upon the elastic walls
of the arteries, causing an increased distention, followed at once by
contraction. This regular dilatation and rigidity of the elastic artery
answering to the beats of the heart, is known as the pulse.

The pulse may be easily found at the wrist, the temple, and the inner side
of the ankle. The throb of the two carotid arteries may be plainly felt by
pressing the thumb and finger backwards on each side of the larynx. The
progress of the pulse-wave must not be confused with the actual current of
the blood itself. For instance, the pulse-wave travels at the rate of
about 30 feet a second, and takes about 1/10 of a second to reach the
wrist, while the blood itself is from 3 to 5 seconds in reaching the same
place.

The pulse-wave may be compared to the wave produced by a stiff breeze on
the surface of a slowly moving stream, or the jerking throb sent along a
rope when shaken. The rate of the pulse is modified by age, fatigue,
posture, exercise, stimulants, disease, and many other circumstances. At
birth the rate is about 140 times a minute, in early infancy, 120 or
upwards, in the healthy adult between 65 and 75, the most common number
being 72. In the same individual, the pulse is quicker when standing than
when lying down, is quickened by excitement, is faster in the morning, and
is slowest at midnight. In old age the pulse is faster than in middle
life; in children it is quicker than in adults.

[Illustration: Fig. 79.--Circulation in the Capillaries, as seen with the
Microscope.]

As the pulse varies much in its rate and character in disease, it is to
the skilled touch of the physician an invaluable help in the diagnosis of
the physical condition of his patient.

  Experiment 92. _To find the pulse_. Grasp the wrist of a friend,
  pressing with three fingers over the radius. Press three fingers over
  the radius in your own wrist, to feel the pulse.

  Count by a watch the rate of your pulse per minute, and do the same with
  a friend's pulse. Compare its characters with your own pulse.

  Observe how the character and frequency of the pulse are altered by
  posture, muscular exercise, a prolonged, sustained, deep inspiration,
  prolonged expiration, and other conditions.

197. Effect of Alcoholic Liquors upon the Organs of Circulation.
Alcoholic drinks exercise a destructive influence upon the heart, the
circulation, and the blood itself. These vicious liquids can reach the
heart only indirectly, either from the stomach by the portal vein to the
liver, and thence to the heart, or else by way of the lacteals, and so to
the blood through the thoracic duct. But by either course the route is
direct enough, and speedy enough to accomplish a vast amount of ruinous
work.

The influence of alcohol upon the heart and circulation is produced mainly
through the nervous system. The inhibitory nerves, as we have seen, hold
the heart in check, exercise a restraining control over it, very much as
the reins control an active horse. In health this inhibitory influence is
protective and sustaining. But now comes the narcotic invasion of
alcoholic drinks, which paralyze the inhibitory nerves, with the others,
and at once the uncontrolled heart, like the unchecked steed, plunges on
to violent and often destructive results.

[Illustration: Fig. 80.--Two Principal Arteries of the Front of the Leg
(Anterior Tibial and Dorsalis Pedis).]

This action, because it is quicker, has been considered also a stronger
action, and the alcohol has therefore been supposed to produce a
stimulating effect. But later researches lead to the conclusion that the
effect of alcoholic liquors is not properly that of a stimulant, but of a
narcotic paralyzant, and that while it indeed quickens, it also really
weakens the heart's action. This view would seem sustained by the fact
that the more the intoxicants are pushed, the deeper are the narcotic and
paralyzing effects. After having obstructed the nutritive and reparative
functions of the vital fluid for many years, their effects at last may
become fatal.

This relaxing effect involves not only the heart, but also the capillary
system, as is shown in the complexion of the face and the color of the
hands. In moderate drinkers the face is only flushed, but in drunkards it
is purplish. The flush attending the early stages of drinking is, of
course, not the flush of health, but an indication of disease.[34]

198. Effect upon the Heart. This forced overworking of the heart
which drives it at a reckless rate, cuts short its periods of rest and
inevitably produces serious heart-exhaustion. If repeated and continued,
it involves grave changes of the structure of the heart. The heart muscle,
endeavoring to compensate for the over-exertion, may become much
thickened, making the ventricles smaller, and so fail to do its duty in
properly pumping forward the blood which rushes in from the auricle. Or
the heart wall may by exhaustion become thinner, making the ventricles
much too large, and unable to send on the current. In still other cases,
the heart degenerates with minute particles of fat deposited in its
structures, and thus loses its power to propel the nutritive fluid. All
three of these conditions involve organic disease of the valves, and all
three often produce fatal results.

199. Effect of Alcohol on the Blood-vessels. Alcoholic liquors injure
not only the heart, but often destroy the blood-vessels, chiefly the
larger arteries, as the arch of the aorta or the basilar artery of the
brain. In the walls of these vessels may be gradually deposited a morbid
product, the result of disordered nutrition, sometimes chalky, sometimes
bony, with usually a dangerous dilatation of the tube.

In other cases the vessels are weakened by an unnatural fatty deposit.
Though these disordered conditions differ somewhat, the morbid results in
all are the same. The weakened and stiffened arterial walls lose the
elastic spring of the pulsing current. The blood fails to sweep on with
its accustomed vigor. At last, owing perhaps to the pressure, against the
obstruction of a clot of blood, or perhaps to some unusual strain of work
or passion, the enfeebled vessel bursts, and death speedily ensues from a
form of apoplexy.

[Illustration: Fig. 81.--Showing the Carotid Artery and Jugular Vein on
the Right Side, with Some of their Main Branches. (Some branches of the
cervical plexus, and the hypoglossal nerve are also shown.)]

    [NOTE. "An alcoholic heart loses its contractile and resisting power,
    both through morbid changes in its nerve ganglia and in its muscle
    fibers. In typhoid fever, muscle changes are evidently the cause of
    the heart-enfeeblement; while in diphtheria, disturbances in
    innervation cause the heart insufficiency. 'If the habitual use of
    alcohol causes the loss of contractile and resisting power by
    impairment of both the nerve ganglia and muscle fibers of the heart,
    how can it act as a heart tonic?'"--Dr. Alfred L. Loomis, Professor of
    Medicine in the Medical Department of the University of the City of
    New York.]

200. Other Results from the Use of Intoxicants. Other disastrous
consequences follow the use of intoxicants, and these upon the blood. When
any alcohol is present in the circulation, its greed for water induces the
absorption of moisture from the red globules of the blood, the
oxygen-carriers. In consequence they contract and harden, thus becoming
unable to absorb, as theretofore, the oxygen in the lungs. Then, in turn,
the oxidation of the waste matter in the tissues is prevented; thus the
corpuscles cannot convey carbon dioxid from the capillaries, and this fact
means that some portion of refuse material, not being thus changed and
eliminated, must remain in the blood, rendering it impure and unfit for
its proper use in nutrition. Thus, step by step, the use of alcoholics
impairs the functions of the blood corpuscles, perverts nutrition, and
slowly poisons the blood.

[Illustration: Fig. 82.--The Right Axillary and Brachial Arteries, with
Some of their Main Branches.]

    [NOTE. "Destroy or paralyze the inhibitory nerve center, and instantly
    its controlling effect on the heart mechanism is lost, and the
    accelerating agent, being no longer under its normal restraint, runs
    riot. The heart's action is increased, the pulse is quickened, an
    excess of blood is forced into the vessels, and from their becoming
    engorged and dilated the face gets flushed, all the usual concomitants
    of a general engorgement of the circulation being the result."--Dr.
    George Harley, F.R.S., an eminent English medical author.

    "The habitual use of alcohol produces a deleterious influence upon the
    whole economy. The digestive powers are weakened, the appetite is
    impaired, and the muscular system is enfeebled. The blood is
    impoverished, and nutrition is imperfect and disordered, as shown by
    the flabbiness of the skin and muscles, emaciation, or an abnormal
    accumulation of fat."--Dr. Austin Flint, Senior, formerly Professor of
    the Practice of Medicine in Bellevue Medical College, and author of
    many standard medical works.

    "The immoderate use of the strong kind of tobacco, which soldiers
    affect, is often very injurious to them, especially to very young
    soldiers. It renders them nervous and shaky, gives rise to
    palpitation, and is a factor in the production of the irritable or
    so-called "trotting-heart" and tends to impair the appetite and
    digestion."--London _Lancet_.

    "I never smoke because I have seen the most efficient proofs of the
    injurious effects of tobacco on the nervous system."--Dr.
    Brown-Sequard, the eminent French physiologist.

    "Tobacco, and especially cigarettes, being a depressant upon the
    heart, should be positively forbidden."--Dr. J. M. Keating, on
    "Physical Development," in _Cyclopædia of the Diseases of
    Children_.]

201. Effect of Tobacco upon the Heart. While tobacco poisons more or
less almost every organ of the body, it is upon the heart that it
works its most serious wrong. Upon this most important organ its
destructive effect is to depress and paralyze. Especially does this apply
to the young, whose bodies are not yet knit into the vigor that can brave
invasion.

The _nicotine_ of tobacco acts through the nerves that control the heart's
action. Under its baneful influence the motions of the heart are
irregular, now feeble and fluttering, now thumping with apparently much
force: but both these forms of disturbed action indicate an abnormal
condition. Frequently there is severe pain in the heart, often dizziness
with gasping breath, extreme pallor, and fainting.

The condition of the pulse is a guide to this state of the heart. In this
the physician reads plainly the existence of the "tobacco heart," an
affection as clearly known among medical men as croup or measles. There
are few conditions more distressing than the constant and impending
suffering attending a tumultuous and fluttering heart. It is stated that
one in every four of tobacco-users is subject, in some degree, to this
disturbance. Test examinations of a large number of lads who had used
cigarettes showed that only a very small percentage escaped cardiac
trouble. Of older tobacco-users there are very few but have some warning
of the hazard they invoke. Generally they suffer more or less from the
tobacco heart, and if the nervous system or the heart be naturally feeble,
they suffer all the more speedily and intensely.



Additional Experiments.

  Experiment 93. Touch a few drops of blood fresh from the finger,
  with a strip of dry, smooth, neutral litmus paper, highly glazed to
  prevent the red corpuscles from penetrating into the test paper. Allow
  the blood to remain a short time; then wash it off with a stream of
  distilled water, when a blue spot upon a red or violet ground will be
  seen, indicating its _alkaline_ reaction, due chiefly to the sodium
  phosphate and sodium carbonate.

  Experiment 94. Place on a glass slide a thin layer of defibrinated
  blood; try to read printed matter through it. This cannot be done.

  Experiment 95. _To make blood transparent or laky_. Place in each
  of three test tubes two or three teaspoonfuls of defibrinated blood,
  obtained from Experiment 89, labeled _A, B_, and _C. A_ is for
  comparison. To _B_ add five volumes of water, and warm slightly, noting
  the change of color by reflected and transmitted light. By reflected
  light it is much darker,--it looks almost black; but by transmitted
  light it is transparent. Test this by looking at printed matter as in
  Experiment 94.

  Experiment 96. To fifteen or twenty drops of defibrinated blood in
  a test tube (labeled _D_) add five volumes of a 10-per-cent solution of
  common salt. It changes to a very bright, florid, brick-red color.
  Compare its color with _A, B_, and _C_. It is opaque.

  Experiment 97. Wash away the coloring matter from the twigs (see
  Experiment 89) with a stream of water until the fibrin becomes quite
  white. It is white, fibrous, and elastic. Stretch some of the fibers to
  show their extensibility; on freeing them, they regain their elasticity.

  Experiment 98. Take some of the serum saved from Experiment 88 and
  note that it does not coagulate spontaneously. Boil a little in a test
  tube over a spirit lamp, and the albumen will coagulate.

  Experiment 99. _To illustrate in a general way that blood is
  really a mass of red bodies which give the red color to the fluid in
  which they float._ Fill a clean white glass bottle two-thirds full of
  little red beads, and then fill the bottle full of water. At a short
  distance the bottle appears to be rilled with a uniformly red liquid.

  Experiment 100. _To show how blood holds a mineral substance in
  solution_. Put an egg-shell crushed fine, into a glass of water made
  acid by a teaspoonful of muriatic acid. After an hour or so the
  egg-shell will disappear, having been dissolved in the acid water. In
  like manner the blood holds various minerals in solution.

  Experiment 101. _To hear the sounds of the heart_. Locate the heart
  exactly. Note its beat. Borrow a stethoscope from some physician. Listen
  to the heart-beat of some friend. Note the sounds of your own heart in
  the same way.

  Experiment 102. _To show how the pulse may be studied_. "The
  movements of the artery in the human body as the pulse-wave passes
  through it may be shown to consist in a sudden dilatation, followed by a
  slow contraction, interrupted by one or more secondary dilatations. This
  demonstration may be made by pressing a small piece of looking-glass
  about one centimeter square (⅔ of an inch) upon the wrist over the
  radial artery, in such a way that with each pulse beat the mirror may be
  slightly tilted. If the wrist be now held in such a position that
  sunlight will fall upon the mirror, a spot of light will be reflected on
  the opposite side of the room, and its motion upon the wall will show
  that the expansion of the artery is a sudden movement, while the
  subsequent contraction is slow and interrupted."--Bowditch's _Hints for
  Teachers of Physiology_.

  [Illustration: Fig. 83.--How the Pulse may be studied by Pressing a
  Mirror over the Radial Artery.]

  Experiment 103. _To illustrate the effect of muscular exercise in
  quickening the pulse_. Run up and down stairs several times. Count the
  pulse both before and after. Note the effect upon the rate.

  Experiment 104. _To show the action of the elastic walls of the
  arteries._ Take a long glass or metal tube of small caliber. Fasten one
  end to the faucet of a water-pipe (one in a set bowl preferred) by a
  very short piece of rubber tube. Turn the water on and off alternately
  and rapidly, to imitate the intermittent discharge of the ventricles.
  The water will flow from the other end of the rubber pipe in jets, each
  jet ceasing the moment the water is shut off.

  The experiment will be more successful if the rubber bulb attached to an
  ordinary medicine-dropper be removed, and the tapering glass tube be
  slipped on to the outer end of the rubber tube attached to the faucet.

  Experiment 105. Substitute a piece of rubber tube for the glass
  tube, and repeat the preceding experiment. Now it will be found that a
  continuous stream flows from the tube. The pressure of water stretches
  the elastic tube, and when the stream is turned off, the rubber recoils
  on the water, and the intermittent flow is changed into a continuous
  stream.

  Experiment 106. _To illustrate some of the phenomena of
  circulation._ Take a common rubber bulb syringe, of the Davidson,
  Household, or any other standard make. Attach a piece of rubber tube
  about six or eight feet long to the delivery end of the syringe.

  To represent the resistance made by the capillaries to the flow of
  blood, slip the large end of a common glass medicine-dropper into the
  outer end of the rubber tube. This dropper has one end tapered to a fine
  point.

  Place the syringe flat, without kinks or bends, on a desk or table.
  Press the bulb slowly and regularly. The water is thus pumped into the
  tube in an intermittent manner, and yet it is forced out of the tapering
  end of the glass tube in a steady flow.

  Experiment 107. Take off the tapering glass tube, or, in the place
  of one long piece of rubber tube, substitute several pieces of glass
  tubing connected together by short pieces of rubber tubes. The obstacle
  to the flow has thus been greatly lessened, and the water flows out in
  intermittent jets to correspond to the compression of the bulb.




Chapter VIII.

Respiration.



202. Nature and Object of Respiration. The blood, as we have learned,
not only provides material for the growth and activity of all the tissues
of the body, but also serves as a means of removing from them the products
of their activity. These are waste products, which if allowed to remain,
would impair the health of the tissues. Thus the blood becomes
impoverished both by the addition of waste material, and from the loss of
its nutritive matter.

We have shown, in the preceding chapter, how the blood carries to the
tissues the nourishment it has absorbed from the food. We have now to
consider a new source of nourishment to the blood, _viz._, that which it
receives from the oxygen of the air. We are also to learn one of the
methods by which the blood gets rid of poisonous waste matters. In brief,
we are to study the set of processes known as respiration, by which
oxygen is supplied to the various tissues, and by which the principal
waste matters, or chief products of oxidation, are removed.

Now, the tissues are continually feeding on the life-giving oxygen, and at
the same time are continually producing carbon dioxid and other waste
products. In fact, the life of the tissues is dependent upon a continual
succession of oxidations and deoxidations. When the blood leaves the
tissues, it is poorer in oxygen, is burdened with carbon dioxid, and has
had its color changed from bright scarlet to purple red. This is the
change from the arterial to venous conditions which has been described in
the preceding chapter.

Now, as we have seen, the change from venous to arterial blood occurs in
the capillaries of the lungs, the only means of communication between the
pulmonary arteries and the pulmonary veins. The blood in the pulmonary
capillaries is separated from the air only by a delicate tissue formed of
its own wall and the pulmonary membrane. Hence a gaseous interchange,
the essential step in respiration, very readily takes place between the
blood and the air, by which the latter gains moisture and carbon dioxid,
and loses its oxygen. These changes in the lungs also restore to the dark
blood its rosy tint.

The only condition absolutely necessary to the purification of the blood
is an organ having a delicate membrane, on one side of which is a thin
sheet of blood, while the other side is in such contact with the air that
an interchange of gases can readily take place. The demand for oxygen is,
however, so incessant, and the accumulation of carbon dioxid is so rapid
in every tissue of the human body, that an All-Wise Creator has provided a
most perfect but complicated set of machinery to effect this wonderful
purification of the blood.

We are now ready to begin the study of the arrangement and working of the
respiratory apparatus. With its consideration, we complete our view of the
sources of supply to the blood, and begin our study of its purification.

[Illustration: Fig. 84.--The Epiglottis.]

203. The Trachea, or Windpipe. If we look into the mouth of a friend,
or into our own with a mirror, we see at the back part an arch which is
the boundary line of the mouth proper. There is just behind this a similar
limit for the back part of the nostrils. The funnel-shaped cavity beyond,
into which both the mouth and the posterior nasal passages open, is
called the pharynx. In its lower part are two openings; the
trachea, or windpipe, in front, and the œsophagus behind.

The trachea is surmounted by a box-like structure of cartilage, about
four and one-half inches long, called the larynx. The upper end of
the larynx opens into the pharynx or throat, and is provided with a lid,--
the epiglottis,--which closes under certain circumstances (secs. 137
and 349). The larynx contains the organ of voice, and is more fully
described in Chapter XII.

The continuation of the larynx is the trachea, a tube about three-fourths
of an inch in diameter, and about four inches long. It extends downwards
along the middle line of the neck, where it may readily be felt in front,
below the Adam's apple.

[Illustration: Fig. 85.--Larynx, Trachea, and the Bronchi. (Front view.)

  A, epiglottis;
  B, thyroid cartilage;
  C, cricoid-thyroid membrane, connecting with the cricoid cartilage below,
     all forming the larynx;
  D, one of the rings of the trachea.
]

The walls of the windpipe are strengthened by a series of cartilaginous
rings, each somewhat the shape of a horseshoe or like the letter C, being
incomplete behind, where they come in contact with the œsophagus.
Thus the trachea, while always open for the passage of air, admits of the
distention of the food-passage.

204. The Bronchial Tubes. The lower end of the windpipe is just
behind the upper part of the sternum, and there it divides into two
branches, called bronchi. Each branch enters the lung of its own
side, and breaks up into a great number of smaller branches, called
bronchial tubes. These divide into smaller tubes, which continue
subdividing till the whole lung is penetrated by the branches, the
extremities of which are extremely minute. To all these branches the
general name of bronchial tubes is given. The smallest are only about
one-fiftieth of an inch in diameter.

[Illustration: Fig. 86.--Relative Position of the Lungs, Heart, and its
Great Vessels.

  A, left ventricle;
  B, right ventricle;
  C, left auricle;
  D, right auricle;
  E, superior vena cava;
  F, pulmonary artery;
  G, aorta;
  H, arch of the aorta;
  K, innominate artery;
  L, right common carotid artery;
  M, right subclavian artery;
  N, thyroid cartilage forming upper portion of the larynx;
  O, trachea.
]

Now the walls of the windpipe, and of the larger bronchial tubes would
readily collapse, and close the passage for air, but for a wise
precaution. The horseshoe-shaped rings of cartilage in the trachea and the
plates of cartilage in the bronchial tubes keep these passages open.
Again, these air passages have elastic fibers running the length of the
tubes, which allow them to stretch and bend readily with the movements of
the neck.

205. The Cilia of the Air Passages. The inner surfaces of the
windpipe and bronchial tubes are lined with mucous membrane, continuous
with that of the throat, the mouth, and the nostrils, the secretion from
which serves to keep the parts moist.

Delicate, hair-like filaments, not unlike the pile on velvet, called
cilia, spring from the epithelial lining of the air tubes. Their
constant wavy movement is always upwards and outwards, towards the mouth.
Thus any excessive secretion, as of bronchitis or catarrh, is carried
upwards, and finally expelled by coughing. In this way, the lungs are kept
quite free from particles of foreign matter derived from the air.
Otherwise we should suffer, and often be in danger from the accumulation
of mucus and dust in the air passages. Thus these tiny cilia act as
dusters which Nature uses to keep the air tubes free and clean (Fig. 5).

[Illustration: Fig. 87.--Bronchial tube, with its Divisions and
Subdivisions. (Showing groups of air cells at the termination of minute
bronchial tubes.)]

206. The Lungs. The lungs, the organs of respiration, are two
pinkish gray structures of a light, spongy appearance, that fill the chest
cavity, except the space taken up by the heart and large vessels. Between
the lungs are situated the large bronchi, the œsophagus, the heart
in its pericardium, and the great blood-vessels. The base of the lungs
rests on the dome-like diaphragm, which separates the chest from the
abdomen. This partly muscular and partly tendinous partition is a most
important factor in breathing.

Each lung is covered, except at one point, with an elastic serous membrane
in a double layer, called the pleura. One layer closely envelops the
lung, at the apex of which it is reflected to the wall of the chest cavity
of its own side, which it lines. The two layers thus form between them a
Closed Sac a serous cavity (see Fig. 69, also note, p. 176).

[Illustration: Fig. 88.--The Lungs with the Trachea, Bronchi, and Larger
Bronchial Tubes exposed. (Posterior view.)

  A, division of left bronchus to upper lobe;
  B, left branch of the Pulmonary artery;
  C, left bronchus;
  D, left superior pulmonary vein;
  E, left inferior pulmonary vein;
  F, left auricle;
  K, inferior vena cava;
  L, division of right bronchus to lower lobe;
  M, right inferior pulmonary vein;
  N, right superior pulmonary vein;
  O, right branch of the pulmonary artery;
  P, division of right bronchus to upper lobe;
  R, left ventricle;
  S, right ventricle.
]

In health the two pleural surfaces of the lungs are always in contact, and
they secrete just enough serous fluid to allow the surfaces to glide
smoothly upon each other. Inflammation of this membrane is called
_pleurisy_. In this disease the breathing becomes very painful, as the
secretion of glairy serum is suspended, and the dry and inflamed surfaces
rub harshly upon each other.

The root of the lung, as it is called, is formed by the bronchi, two
pulmonary arteries, and two pulmonary veins. The nerves and lymphatic
vessels of the lung also enter at the root. If we only remember that all
the bronchial tubes, great and small, are hollow, we may compare the whole
system to a short bush or tree growing upside down in the chest, of which
the trachea is the trunk, and the bronchial tubes the branches of various
sizes.

207. Minute Structure of the Lungs. If one of the smallest bronchial
tubes be traced in its tree-like ramifications, it will be found to end in
an irregular funnel-shaped passage wider than itself. Around this passage
are grouped a number of honeycomb-like sacs, the air cells[35] or
alveoli of the lungs. These communicate freely with the passage, and
through it with the bronchial branches, but have no other openings. The
whole arrangement of passages and air cells springing from the end of a
bronchial tube, is called an ultimate lobule. Now each lobule is a
very small miniature of a whole lung, for by the grouping together of
these lobules another set of larger lobules is formed.

[Illustration: Fig. 89.

  A, diagrammatic representation of the ending of a bronchial tube in air
     sacs or alveoli;
  B, termination of two bronchial tubes in enlargement beset with air sacs
     (_Huxley_);
  C, diagrammatic view of an air sac.

  a lies within sac and points to epithelium lining wall;
  b, partition between two adjacent sacs, in which run capillaries;
  c, elastic connective tissue (_Huxley_).
]

In like manner countless numbers of these lobules, bound together by
connective tissue, are grouped after the same fashion to form by their
aggregation the lobes of the lung. The right lung has three such
lobes; and the left, two. Each lobule has a branch of the pulmonary artery
entering it, and a similar rootlet of the pulmonary vein leaving it. It
also receives lymphatic vessels, and minute twigs of the pulmonary plexus
of nerves.

[Illustration: Fig. 90.--Diagram to illustrate the Amounts of Air
contained by the Lungs in Various Phases of Ordinary and of Forced
Respiration.]

The walls of the air cells are of extreme thinness, consisting of delicate
elastic and connective tissue, and lined inside by a single layer of thin
epithelial cells. In the connective tissue run capillary vessels belonging
to the pulmonary artery and veins. Now these delicate vessels running in
the connective tissue are surrounded on all sides by air cells. It is
evident, then, that the blood flowing through these capillaries is
separated from the air within the cells only by the thin walls of the
vessels, and the delicate tissues of the air cells.

This arrangement is perfectly adapted for an interchange between the
blood in the capillaries and the air in the air cells. This will be more
fully explained in sec. 214.

208. Capacity of the Lungs. In breathing we alternately take into and
expel from the lungs a certain quantity of air. With each quiet
inspiration about 30 cubic inches of air enter the lungs, and 30 cubic
inches pass out with each expiration. The air thus passing into and out of
the lungs is called tidal air. After an ordinary inspiration, the
lungs contain about 230 cubic inches of air. By taking a deep inspiration,
about 100 cubic inches more can be taken in. This extra amount is called
complemental air.

After an ordinary expiration, about 200 cubic inches are left in the
lungs, but by forced expiration about one-half of this may be driven out.
This is known as supplemental air. The lungs can never be entirely
emptied of air, about 75 to 100 cubic inches always remaining. This is
known as the residual air.

The air that the lungs of an adult man are capable of containing is thus
composed:

  Complemental air            100 cubic inches.
  Tidal         "              30   "     "
  Supplemental  "             100   "     "
  Residual      "             100   "     "
                             ----
  Total capacity of lungs     330   "     "

If, then, a person proceeds, after taking the deepest possible breath, to
breath out as much as he can, he expels:

  Complemental air           100 cubic inches.
  Tidal         "             30   "     "
  Supplemental  "            100   "     "
                            ----
                             230

This total of 230 cubic inches forms what is called the vital
capacity of the chest (Fig. 90).

209. The Movements of Breathing. The act of breathing consists of a
series of rhythmical movements, succeeding one another in regular order.
In the first movement, inspiration, the chest rises, and there is an
inrush of fresh air; this is at once followed by expiration, the
falling of the chest walls, and the output of air. A pause now occurs, and
the same breathing movements are repeated.

The entrance and the exit of air into the respiratory passages are
accompanied with peculiar sounds which are readily heard on placing the
ear at the chest wall. These sounds are greatly modified in various
pulmonary diseases, and hence are of great value to the physician in
making a correct diagnosis.

In a healthy adult, the number of respirations should be from 16 to 18 per
minute, but they vary with age, that of a newly born child being 44 for
the same time. Exercise increases the number, while rest diminishes it. In
standing, the rate is more than when lying at rest. Mental emotion and
excitement quicken the rate. The number is smallest during sleep. Disease
has a notable effect upon the frequency of respirations. In diseases
involving the lungs, bronchial tubes, and the pleura, the rate may be
alarmingly increased, and the pulse is quickened in proportion.

210. The Mechanism of Breathing. The chest is a chamber with bony
walls, the ribs connecting in front with the breastbone, and behind with
the spine. The spaces between the ribs are occupied by the intercostal
muscles, while large muscles clothe the entire chest. The diaphragm serves
as a movable floor to the chest, which is an air-tight chamber with
movable walls and floor. In this chamber are suspended the lungs, the air
cells of which communicate with the outside through the bronchial
passages, but have no connection with the chest cavity. The thin space
between the lungs and the rib walls, called the pleural cavity, is in
health a vacuum.

Now, when the diaphragm contracts, it descends and thus increases the
depth of the chest cavity. A quantity of air is now drawn into the lungs
and causes them to expand, thus filling up the increased space. As soon as
the diaphragm relaxes, returning to its arched position and reducing the
size of the chest cavity, the air is driven from the lungs, which then
diminish in size. After a short pause, the diaphragm again contracts, and
the same round of operation is constantly repeated.

The walls of the chest being movable, by the contractions of the
intercostals and other muscles, the ribs are raised and the breastbone
pushed forward. The chest cavity is thus enlarged from side to side and
from behind forwards. Thus, by the simultaneous descent of the diaphragm
and the elevation of the ribs, the cavity of the chest is increased in
three directions,--downwards, side-ways, and from behind forwards.

It is thus evident that inspiration is due to a series of muscular
contractions. As soon as the contractions cease, the elastic lung
tissue resumes its original position, just as an extended rubber band
recovers itself. As a result, the original size of the chest cavity is
restored, and the inhaled air is driven from the lungs. Expiration may
then be regarded as the result of an elastic recoil, and not of active
muscular contractions.

[Illustration: Fig. 91.--Diagrammatic Section of the Trunk. (Showing the
expansion of the chest and the movement of the ribs by action of the
lungs.) [The dotted lines indicate the position during inspiration.]]

211. Varieties of Breathing. This is the mechanism of quiet, normal
respiration. When the respiration is difficult, additional forces are
brought into play. Thus when the windpipe and bronchial tubes are
obstructed, as in croup, asthma, or consumption, many additional muscles
are made use of to help the lungs to expand. The position which asthmatics
often assume, with arms raised to grasp something for support, is from the
need of the sufferer to get a fixed point from which the muscles of the
arm and chest may act forcibly in raising the ribs, and thus securing more
comfortable breathing.

The visible movements of breathing vary according to circumstances. In
infants the action of the diaphragm is marked, and the movements of the
abdomen are especially obvious. This is called abdominal breathing. In
women the action of the ribs as they rise and fall, is emphasized more
than in men, and this we call costal breathing. In young persons and in
men, the respiration not usually being impeded by tight clothing, the
breathing is normal, being deep and abdominal.

Disease has a marked effect upon the mode of breathing. Thus, when
children suffer from some serious chest disease, the increased movements
of the abdominal walls seem distressing. So in fracture of the ribs, the
surgeon envelops the overlying part of the chest with long strips of firm
adhesive plaster to restrain the motions of chest respiration, that they
may not disturb the jagged ends of the broken bones. Again, in painful
diseases of the abdomen, the sufferer instinctively suspends the abdominal
action and relies upon the chest breathing. These deviations from the
natural movements of respiration are useful to the physician in
ascertaining the seat of disease.

212. The Nervous Control of Respiration. It is a matter of common
experience that one's breath may be held for a short time, but the need of
fresh air speedily gets the mastery, and a long, deep breath is drawn.
Hence the efforts of criminals to commit suicide by persistent restraint
of their breathing, are always a failure. At the very worst,
unconsciousness ensues, and then respiration is automatically resumed.
Thus a wise Providence defeats the purpose of crime. The movements of
breathing go on without our attention. In sleep the regularity of
respiration is even greater than when awake. There is a particular part of
the nervous system that presides over the breathing function. It is
situated in that part of the brain called the medulla oblongata, and is
fancifully called the "vital knot" (sec. 270). It is injury to this
respiratory center which proves fatal in cases of broken neck.

From this nerve center there is sent out to the nerves that supply the
diaphragm and other muscles of breathing, a force which stimulates them to
regular contraction. This breathing center is affected by the condition of
the blood. It is stimulated by an excess of carbon dioxid in the blood,
and is quieted by the presence of oxygen.

  Experiment 108. _To locate the lungs_. Mark out the boundaries of
  the lungs by "sounding" them; that is, by _percussion_, as it is called.
  This means to put the forefinger of the left hand across the chest or
  back, and to give it a quick, sharp rap with two or three fingers. Note
  where it sounds hollow, resonant. This experiment can be done by the
  student with only imperfect success, until practice brings some skill.

  Experiment 109. Borrow a stethoscope, and listen to the respiration
  over the chest on the right side. This is known as _auscultation_. Note
  the difference of the sounds in inspiration and in expiration. Do not
  confuse the heart sounds with those of respiration. The respiratory
  murmurs may be heard fairly well by applying the ear flat to the chest,
  with only one garment interposed.

  Experiment 110. Get a sheep's lungs, with the windpipe attached.
  Ask for the heart and lungs all in one mass. Take pains to examine the
  specimen first, and accept only a good one. Parts are apt to be hastily
  snipped or mangled. Examine the windpipe. Note the horseshoe-shaped
  rings of cartilage in front, which serve to keep it open.

  Experiment 111. Examine one bronchus, carefully dissecting away the
  lung tissue with curved scissors. Follow along until small branches of
  the bronchial tubes are reached. Take time for the dissection, and save
  the specimen in dilute alcohol. Put pieces of the lung tissue in a basin
  of water, and note that they float.

The labored breathing of suffocation and of lung diseases is due to the
excessive stimulation of this center, caused by the excess of carbon
dioxid in the blood. Various mental influences from the brain itself, as
the emotions of alarm or joy or distress, modify the action of the
respiratory center.

Again, nerves of sensation on the surface of the body convey influences to
this nerve center and lead to its stimulation, resulting in a vigorous
breathing movement. Thus a dash of cold water on the face or neck of a
fainting person instantly produces a deep, long-drawn breath. Certain
drugs, as opium, act to reduce the activity of this nerve center. Hence,
in opium poisoning, special attention should be paid to keeping up the
respiration. The condition of the lungs themselves is made known to the
breathing center, by messages sent along the branches of the great
pneumogastric nerve (page 276), leading from the lungs to the medulla
oblongata.

213. Effects of Respiration upon the Blood. The blood contains three
gases, partly dissolved in it and partly in chemical union with certain of
its constituents. These are oxygen, carbon dioxid, and nitrogen.
The latter need not be taken into account. The oxygen is the
nourishing material which the tissues require to carry on their work. The
carbon dioxid is a waste substance which the tissues produce by their
activity, and which the blood carries away from them.

As before shown, the blood as it flows through the tissues loses most of
its oxygen, and carbon dioxid takes its place. Now if the blood is to
maintain its efficiency in this respect, it must always be receiving new
supplies of oxygen, and also have some mode of throwing off its excess of
carbon dioxid. This, then, is the double function of the process of
respiration. Again, the blood sent out from the left side of the heart is
of a bright scarlet color. After its work is done, and the blood returns
to the right side of the heart, it is of a dark purple color. This change
in color takes place in the capillaries, and is due to the fact that there
the blood gives up most of its oxygen to the tissues and receives from
them a great deal of carbon dioxid.

In brief, while passing through the capillaries of the lungs the blood has
been changed from the venous to the arterial blood. That is to say, the
blood in its progress through the lungs has rid itself of its excess of
carbon dioxid and obtained a fresh supply of oxygen.[36]

214. Effects of Respiration upon the Air in the Lungs. It is well
known that if two different liquids be placed in a vessel in contact with
each other and left undisturbed, they do not remain separate, but
gradually mix, and in time will be perfectly combined. This is called
diffusion of liquids. The same thing occurs with gases, though the process
is not visible. This is known as the diffusion of gases. It is also true
that two liquids will mingle when separated from each other by a membrane
(sec. 129). In a similar manner two gases, especially if of different
densities, may mingle even when separated from each other by a membrane.

In a general way this explains the respiratory changes that occur in the
blood in the lungs. Blood containing oxygen and carbon dioxid is flowing
in countless tiny streams through the walls of the air cells of the lungs.
The air cells themselves contain a mixture of the same two gases. A thin,
moist membrane, well adapted to allow gaseous diffusion, separates the
blood from the air. This membrane is the delicate wall of the capillaries
and the epithelium of the air cells. By experiment it has been found that
the pressure of oxygen in the blood is less than that in the air cells,
and that the pressure of carbon dioxid gas in the blood is greater than
that in the air cells. As a result, a diffusion of gases ensues. The
blood gains oxygen and loses carbon dioxid, while the air cells lose
oxygen and gain the latter gas.

[Illustration: Fig. 92.--Capillary Network of the Air Cells and Origin of
the Pulmonary Veins.

  A, small branch of pulmonary artery;
  B, twigs of the pulmonary artery anastomosing to form peripheral network
     of the primitive air cells;
  C, capillary network around the walls of the air sacs;
  D, branches of network converging for form the veinlets of the pulmonary
     veins.
]

The blood thus becomes purified and reinvigorated, and at the same time is
changed in color from purple to scarlet, from venous to arterial. It is
now evident that if this interchange is to continue, the air in the cells
must be constantly renewed, its oxygen restored, and its excess of carbon
dioxid removed. Otherwise the process just described would be reversed,
making the blood still more unfit to nourish the tissues, and more
poisonous to them than before.

215. Change in the Air in Breathing. The air which we exhale during
respiration differs in several important particulars from the air we
inhale. Both contain chiefly the three gases, though in different
quantities, as the following table shows.

                            Oxygen.    Nitrogen.   Carbon Dioxid.
  Inspired air contains      20.81       79.15         .04
  Expired air contains       16.03       79.58        4.38

That is, expired air contains about five per cent less oxygen and five per
cent more carbon dioxid than inspired air.

The temperature of expired air is variable, but generally is higher than
that of inspired air, it having been in contact with the warm air
passages. It is also loaded with aqueous vapor, imparted to it like
the heat, not in the depth of the lungs, but in the upper air passages.

Expired air contains, besides carbon dioxid, various impurities, many of
an unknown nature, and all in small amounts. When the expired air is
condensed in a cold receiver, the aqueous product is found to contain
organic matter, which, from the presence of _micro-organisms_,
introduced in the inspired air, is apt to putrefy rapidly. Some of these
organic substances are probably poisonous, either so in themselves, as
produced in some manner in the breathing apparatus, or poisonous as being
the products of decomposition. For it is known that various animal
substances give rise, by decomposition, to distinct poisonous products
known as _ptomaines_. It is possible that some of the constituents of the
expired air are of an allied nature. See under "Bacteria" (Chapter XIV).

At all events, these substances have an injurious action, for an
atmosphere containing simply one per cent of pure carbon dioxid has very
little hurtful effect on the animal economy, but an atmosphere in which
the carbon dioxid has been raised one per cent by breathing is highly
injurious.

The quantity of oxygen removed from the air by the breathing of an adult
person at rest amounts daily to about 18 cubic feet. About the same amount
of carbon dioxid is expelled, and this could be represented by a piece of
pure charcoal weighing 9 ounces. The quantity of carbon dioxid, however,
varies with the age, and is increased also by external cold and by
exercise, and is affected by the kind of food. The amount of water,
exhaled as vapor, varies from 6 to 20 ounces daily. The average daily
quantity is about one-half a pint.

216. Modified Respiratory Movements. The respiratory column of air is
often used in a mechanical way to expel bodies from the upper air
passages. There are also, in order to secure special ends, a number of
modified movements not distinctly respiratory. The following peculiar
respiratory acts call for a few words of explanation.

A sigh is a rapid and generally audible expiration, due to the
elastic recoil of the lungs and chest walls. It is often caused by
depressing emotions. Yawning is a deep inspiration with a stretching
of the muscles of the face and mouth, and is usually excited by fatigue or
drowsiness, but often occurs from a sort of contagion.

Hiccough is a sudden jerking inspiration due to the spasmodic
contraction of the diaphragm and of the glottis, causing the air to rush
suddenly through the larynx, and produce this peculiar sound. Snoring
is caused by vibration of the soft palate during sleep, and is habitual
with some, although it occurs with many when the system is unusually
exhausted and relaxed.

Laughing consists of a series of short, rapid, spasmodic expirations
which cause the peculiar sounds, with characteristic movements of the
facial muscles. Crying, caused by emotional states, consists of
sudden jerky expirations with long inspirations, with facial movements
indicative of distress. In sobbing, which often follows
long-continued crying, there is a rapid series of convulsive inspirations,
with sudden involuntary contractions of the diaphragm. Laughter, and
sometimes sobbing, like yawning, may be the result of involuntary
imitation.

  Experiment 112. _Simple Apparatus to Illustrate the Movements of
  the Lungs in the Chest_.--T is a bottle from which the bottom has been
  removed; D, a flexible and elastic membrane tied on the bottle, and
  capable of being pulled out by the string S, so as to increase the
  capacity of the bottle. L is a thin elastic bag representing the lungs.
  It communicates with the external air by a glass tube fitted air-tight
  through a cork in the neck of the bottle. When D is drawn down, the
  pressure of the external air causes L to expand. When the string is let
  go, L contracts again, by virtue of its elasticity.

  [Illustration: Fig. 93.]

Coughing is produced by irritation in the upper part of the windpipe
and larynx. A deep breath is drawn, the opening of the windpipe is closed,
and immediately is burst open with a violent effort which sends a blast of
air through the upper air passages. The object is to dislodge and expel
any mucus or foreign matter that is irritating the air passages.

Sneezing is like coughing; the tongue is raised against the soft
palate, so the air is forced through the nasal passages. It is caused by
an irritation of the nostrils or eyes. In the beginning of a cold in the
head, for instance, the cold air irritates the inflamed mucous membrane of
the nose, and causes repeated attacks of sneezing.

217. How the Atmosphere is Made Impure. The air around us is
constantly being made impure in a great variety of ways. The combustion of
fuel, the respiration of men and animals, the exhalations from their
bodies, the noxious gases and effluvia of the various industries, together
with the changes of fermentation and decomposition to which all organized
matter is liable,--all tend to pollute the atmosphere.

The necessity of external ventilation has been foreseen for us. The
forces of nature,--the winds, sunlight, rain, and growing vegetation,--all
of great power and universal distribution and application, restore the
balance, and purify the air. As to the principal gases, the air of the
city does not differ materially from that of rural sections. There is,
however, a vastly greater quantity of dust and smoke in the air of towns.
The breathing of this dust, to a greater or less extent laden with
bacteria, fungi, and the germs of disease, is an ever-present and most
potent menace to public and personal health. It is one of the main causes
of the excess of mortality in towns and cities over that of country
districts.

This is best shown in the overcrowded streets and houses of great cities,
which are deprived of the purifying influence of sun and air. The fatal
effect of living in vitiated air is especially marked in the mortality
among infants and children living in the squalid and overcrowded sections
of our great cities. The salutary effect of sunshine is shown by the fact
that mortality is usually greater on the shady side of the street.

218. How the Air is Made Impure by Breathing. It is not the carbon
dioxid alone that causes injurious results to health, it is more
especially the organic matter thrown off in the expired air. The
carbon dioxid which accompanies the organic matter is only the index. In
testing the purity of air it is not difficult to ascertain the amount of
carbon dioxid present, but it is no easy problem to measure the amount of
organic matter. Hence it is the former that is looked for in factories,
churches, schoolrooms, and when it is found to exceed .07 per cent it is
known that there is a hurtful amount of organic matter present.

The air as expelled from the lungs contains, not only a certain amount of
organic matter in the form of vapor, but minute solid particles of
_débris_ and bacterial micro-organisms (Chap. XIV). The air thus
already vitiated, after it leaves the mouth, putrefies very rapidly. It is
at once absorbed by clothing, curtains, carpets, porous walls, and by many
other objects. It is difficult to dislodge these enemies of health even by
free ventilation. The close and disagreeable odor of a filthy or
overcrowded room is due to these organic exhalations from the lungs, the
skin, and the unclean clothing of the occupants.

The necessity of having a proper supply of fresh air in enclosed
places, and the need of removal of impure air are thus evident. If a
man were shut up in a tightly sealed room containing 425 cubic feet of
air, he would be found dead or nearly so at the end of twenty-four hours.
Long before this time he would have suffered from nausea, headache,
dizziness, and other proofs of blood-poisoning. These symptoms are often
felt by those who are confined for an hour or more in a room where the
atmosphere has been polluted by a crowd of people. The unpleasant effects
rapidly disappear on breathing fresh air.

219. The Effect on the Health of Breathing Foul Air. People are often
compelled to remain indoors for many hours, day after day, in shops,
factories, or offices, breathing air perhaps only slightly vitiated, but
still recognized as "stuffy." Such persons often suffer from ill health.
The exact form of the disturbance of health depends much upon the
hereditary proclivity and physical make-up of the individual. Loss of
appetite, dull headache, fretfulness, persistent weariness, despondency,
followed by a general weakness and an impoverished state of blood, often
result.

Persons in this lowered state of health are much more prone to surfer from
colds, catarrhs, bronchitis, and pneumonia than if they were living in the
open air, or breathing only pure air. Thus, in the Crimean War, the
soldiers who lived in tents in the coldest weather were far more free from
colds and lung troubles than those who lived in tight and ill-ventilated
huts. In the early fall when typhoid fever is prevalent, the grounds of
large hospitals are dotted with canvas tents, in which patients suffering
from this fever do much better than in the wards.

This tendency to inflammatory diseases of the air passages is aggravated
by the overheated and overdried condition of the air in the room occupied.
This may result from burning gas, from overheated furnaces and stoves,
hot-water pipes, and other causes. Serious lung diseases, such as
consumption, are more common among those who live in damp, overcrowded, or
poorly ventilated homes.

220. The Danger from Pulmonary Infection. The germ of pulmonary
consumption, known as the bacillus tuberculosis, is contained in the
breath and the sputa from the lungs of its victims. It is not difficult to
understand how these bacilli may be conveyed through the air from the
lungs of the sick to those of apparently healthy people. Such persons may,
however, be predisposed, either constitutionally or by defective hygienic
surroundings, to fall victims to this dreaded disease. Overcrowding, poor
ventilation, and dampness all tend to increase the risk of pulmonary
infection.

It must not be supposed that the tubercle bacillus is necessarily
transmitted directly through the air from the lungs of the sick to be
implanted in the lungs of the healthy. The germs may remain for a time in
the dust turn and _débris_ of damp, filthy, and overcrowded houses. In
this congenial soil they retain their vitality for a long time, and
possibly may take on more virulent infective properties than they
possessed when expelled from the diseased lungs.[37]

[Illustration: Fig. 94. Example of a Micro-Organism--Bacillus Tuberculosis
in Spotum. (Magnified about 500 diameters.)]

221. Ventilation. The question of a practicable and economical system
of ventilation for our homes, schoolrooms, workshops, and public
places presents many difficult and perplexing problems. It is perhaps due
to the complex nature of the subject, that ventilation, as an ordinary
condition of daily health, has been so much neglected. The matter is
practically ignored in building ordinary houses. The continuous renewal of
air receives little if any consideration, compared with the provision made
to furnish our homes with heat, light, and water. When the windows are
closed we usually depend for ventilation upon mere chance,--on the
chimney, the fireplace, and the crevices of doors and windows. The proper
ventilation of a house and its surroundings should form as prominent a
consideration in the plans of builders and architects as do the grading of
the land, the size of the rooms, and the cost of heating.

The object of ventilation is twofold: First, to provide for the removal
of the impure air; second, for a supply of pure air. This must
include a plan to provide fresh air in such a manner that there shall be
no draughts or exposure of the occupants of the rooms to undue
temperature. Hence, what at first might seem an easy thing to do, is, in
fact, one of the most difficult of sanitary problems.

222. Conditions of Efficient Ventilation. To secure proper
ventilation certain conditions must be observed. The pure air introduced
should not be far below the temperature of the room, or if so, the
entering current should be introduced towards the ceiling, that it may mix
with the warm air.

Draughts must be avoided. If the circuit from entrance to exit is short,
draughts are likely to be produced, and impure air has less chance of
mixing by diffusion with the pure air. The current of air introduced
should be constant, otherwise the balance may occasionally be in favor of
vitiated air. If a mode of ventilation prove successful, it should not be
interfered with by other means of entrance. Thus, an open door may prevent
the incoming air from passing through its proper channels. It is desirable
that the inlet be so arranged that it can be diminished in size or closed
altogether. For instance, when the outer air is very cold, or the wind
blows directly into the inlet, the amount of cold air entering it may
lower the temperature of the room to an undesirable degree.

In brief, it is necessary to have a thorough mixing of pure and impure
air, so that the combination at different parts of the room may be fairly
uniform. To secure these results, the inlets and outlets should be
arranged upon principles of ventilation generally accepted by authorities
on public health. It seems hardly necessary to say that due attention must
be paid to the source from which the introduced air is drawn. If it be
taken from foul cellars, or from dirty streets, it may be as impure as
that which it is designed to replace.



Animal Heat.


223. Animal or Vital Heat. If a thermometer, made for the purpose, be
placed for five minutes in the armpit, or under the tongue, it will
indicate a temperature of about 98½° F., whether the surrounding
atmosphere be warm or cold. This is the natural heat of a healthy person,
and in health it rarely varies more than a degree or two. But as the body
is constantly losing heat by radiation and conduction, it is evident that
if the standard temperature be maintained, a certain amount of heat must
be generated within the body to make up for the loss externally. The heat
thus produced is known as animal or vital heat.

This generation of heat is common to all living organisms. When the mass
of the body is large, its heat is readily perceptible to the touch and by
its effect upon the thermometer. In mammals and birds the heat-production
is more active than in fishes and reptiles, and their temperatures differ
in degree even in different species of the same class, according to the
special organization of the animal and the general activity of its
functions. The temperature of the frog may be 85° F. in June and 41° F. in
January. The structure of its tissues is unaltered and their vitality
unimpaired by such violent fluctuations. But in man it is necessary not
only for health, but even for life, that the temperature should vary only
within narrow limits around the mean of 98½° F.

We are ignorant of the precise significance of this constancy of
temperature in warm-blooded animals, which is as important and peculiar as
their average height, Man, undoubtedly, must possess a superior delicacy
of organization, hardly revealed by structure, which makes it necessary
that he should be shielded from the shocks and jars of varying
temperature, that less highly endowed organisms endure with impunity.

224. Sources of Bodily Heat. The heat of the body is generated by the
chemical changes, generally spoken of as those of oxidation, which are
constantly going on in the tissues. Indeed, whenever protoplasmic
materials are being oxidized (the process referred to in sec. 15 as
katabolism) heat is being set free. These chemical changes are of
various kinds, but the great source of heat is the katabolic process,
known as oxidation.

The vital part of the tissues, built up from the complex classes of food,
is oxidized by means of the oxygen carried by the arterial blood, and
broken down into simpler bodies which at last result in urea, carbon
dioxid, and water. Wherever there is life, this process of oxidation is
going on, but more energetically in some tissues and organs than in
others. In other words, the minutest tissue in the body is a source of
heat in proportion to the activity of its chemical changes. The more
active the changes, the greater is the heat produced, and the greater the
amount of urea, carbon dioxid, and water eliminated. The waste caused by
this oxidation must be made good by a due supply of food to be built up
into protoplasmic material. For the production of heat, therefore, food is
necessary. But the oxidation process is not as simple and direct as the
statement of it might seem to indicate. Though complicated in its various
stages, the ultimate result is as simple as in ordinary combustion outside
of the body, and the products are the same.

The continual chemical changes, then, chiefly by oxidation of combustible
materials in the tissues, produce an amount of heat which is efficient to
maintain the temperature of the living body at about 98½° F. This process
of oxidation provides not only for the heat of the body, but also for
the energy required to carry on the muscular work of the animal
organism.

225. Regulation of the Bodily Temperature. While bodily heat is being
continually produced, it is also as continually being lost by the lungs,
by the skin, and to some extent, by certain excretions. The blood, in its
swiftly flowing current, carries warmth from the tissues where heat is
being rapidly generated, to the tissues or organs in which it is being
lost by radiation, conduction, or evaporation. Were there no arrangement
by which heat could be distributed and regulated, the temperature of the
body would be very unequal in different parts, and would vary at different
times.

The normal temperature is maintained with slight variations throughout
life. Indeed a change of more than a degree above or below the average,
indicates some failure in the organism, or some unusual influence. It is
evident, then, that the mechanisms which regulate the temperature of the
body must be exceedingly sensitive.

The two chief means of regulating the temperature of the body are the
lungs and the skin. As a means of lowering the temperature, the
lungs and air passages are very inferior to the skin; although, by giving
heat to the air we breathe, they stand next to the skin in importance. As
a regulating power they are altogether subordinate to the skin.

  Experiment 113. _To show the natural temperature of the body_.
  Borrow a physician's clinical thermometer, and take your own
  temperature, and that of several friends, by placing the instrument
  under the tongue, closing the mouth, and holding it there for five
  minutes. It should be thoroughly cleansed after each use.

226. The Skin as a Heat-regulator. The great regulator of the bodily
temperature is, undoubtedly, the skin, which performs this function
by means of a self-regulating apparatus with a more or less double action.
First, the skin regulates the loss of heat by means of the vaso-motor
mechanism. The more blood passes through the skin, the greater will be
the loss of heat by conduction, radiation, and evaporation. Hence, any
action of the vaso-motor mechanism which causes dilatation of the
cutaneous capillaries, leads to a larger flow of blood through the skin,
and will tend to cool the body. On the other hand, when by the same
mechanism the cutaneous vessels are constricted, there will be a smaller
flow of blood through the skin, which will serve to check the loss of heat
from the body (secs. 195 and 270).

Again, the special nerves of perspiration act directly as regulators
of temperature. They increase the loss of heat when they promote the
secretion of the skin, and diminish the loss when they cease to promote
it.

The practical working of this heat-regulating mechanism is well shown by
exercise. The bodily temperature rarely rises so much as a degree during
vigorous exercise. The respiration is increased, the cutaneous capillaries
become dilated from the quickened circulation, and a larger amount of
blood is circulating through the skin. Besides this, the skin perspires
freely. A large amount of heat is thus lost to the body, sufficient to
offset the addition caused by the muscular contractions.

It is owing to the wonderful elasticity of the sweat-secreting mechanism,
and to the increase in respiratory activity, and the consequent increase
in the amount of watery vapor given off by the lungs, that men are able to
endure for days an atmosphere warmer than the blood, and even for a short
time at a temperature above that of boiling water. The temperature of a
Turkish bath may be as high as 150° to 175° F. But an atmospheric
temperature may be considerably below this, and yet if long continued
becomes dangerous to life. In August, 1896, for instance, hundreds of
persons died in this country, within a few days, from the effects of the
excessive heat.

A much higher temperature may be borne in dry air than in humid air, or
that which is saturated with watery vapor. Thus, a shade temperature of
100° F. in the dry air of a high plain may be quite tolerable, while a
temperature of 80° F. in the moisture-laden atmosphere of less elevated
regions, is oppressive. The reason is that in dry air the sweat evaporates
freely, and cools the skin. In saturated air at the bodily temperature
there is little loss of heat by perspiration, or by evaporation from the
bodily surface.

This topic is again discussed in the description of the skin as a
regulator of the bodily temperature (sec. 241).

227. Voluntary Means of Regulating the Temperature. The voluntary
factor, as a means of regulating the heat loss in man, is one of great
importance. Clothing retards the loss of heat by keeping in contact with
it a layer of still air, which is an exceedingly bad conductor. When a man
feels too warm and throws off his coat, he removes one of the badly
conducting layers of air, and increases the heat loss by radiation and
conduction. The vapor next the skin is thus allowed a freer access to the
surface, and the loss of heat by evaporation of the sweat becomes greater.
This voluntary factor by which the equilibrium is maintained must be
regarded as of great importance. This power also exists in the lower
animals, but to a much smaller extent. Thus a dog, on a hot day, runs out
his tongue and stretches his limbs so as to increase the surface from
which heat is radiated and conducted.

The production, like the loss, of heat is to a certain extent under the
control of the will. Work increases the production of heat, and rest,
especially sleep, lessens it. Thus the inhabitants of very hot countries
seek relief during the hottest part of the day by a siesta. The quantity
and quality of food also influence the production of heat. A larger
quantity of food is taken in winter than in summer. Among the inhabitants
of the northern and Arctic regions, the daily consumption of food is far
greater than in temperate and tropical climates.

228. Effect of Alcohol upon the Lungs. It is a well recognized fact
that alcohol when taken into the stomach is carried from that organ to the
liver, where, by the baneful directness of its presence, it produces a
speedy and often disastrous effect. But the trail of its malign power does
not disappear there. From the liver it passes to the right side of the
heart, and thence to the lungs, where its influence is still for harm.

In the lungs, alcohol tends to check and diminish the breathing capacity
of these organs. This effect follows from the partial paralyzing influence
of the stupefying agent upon the sympathetic nervous system, diminishing
its sensibility to the impulse of healthful respiration. This diminished
capacity for respiration is clearly shown by the use of the _spirometer_,
a simple instrument which accurately records the cubic measure of the
lungs, and proves beyond denial the decrease of the lung space.

  "Most familiar and most dangerous is the drinking man's inability to
  resist lung diseases."--Dr. Adoph Frick, the eminent German physiologist
  of Zurich.

  "Alcohol, instead of preventing consumption, as was once believed,
  reduces the vitality so much as to render the system unusually
  susceptible to that fatal disease."--R. S. Tracy, M.D., Sanitary
  Inspector of the N. Y. City Health Dept.

  "In thirty cases in which alcoholic phthisis was present a dense,
  fibroid, pigmented change was almost invariably present in some portion
  of the lung far more frequently than in other cases of
  phthisis."--_Annual of Medical Sciences_.

  "There is no form of consumption so fatal as that from alcohol.
  Medicines affect the disease but little, the most judicious diet fails,
  and change of air accomplishes but slight real good.... In plain terms,
  there is no remedy whatever for alcoholic phthisis. It may be delayed in
  its course, but it is never stopped; and not infrequently, instead of
  being delayed, it runs on to a fatal termination more rapidly than is
  common in any other type of the disorder."--Dr. B. W. Richardson in
  _Diseases of Modern Life_.

229. Other Results of Intoxicants upon the Lungs. But a more potent
injury to the lungs comes from another cause. The lungs are the arena
where is carried on the ceaseless interchange of elements that is
necessary to the processes of life. Here the dark venous blood, loaded
with effete material, lays down its carbon burden and, with the
brightening company of oxygen, begins again its circuit. But the enemy
intrudes, and the use of alcohol tends to prevent this benign interchange.

The continued congestion of the lung tissue results in its becoming
thickened and hardened, thus obstructing the absorption of oxygen, and the
escape of carbon dioxid. Besides this, alcohol destroys the integrity of
the red globules, causing them to shrink and harden, and impairing their
power to receive oxygen. Thus the blood that leaves the lungs conveys an
excess of the poisonous carbon dioxid, and a deficiency of the needful
oxygen. This is plainly shown in the purplish countenance of the
inebriate, crowded with enlarged veins. This discoloration of the face is
in a measure reproduced upon the congested mucous membrane of the lungs.
It is also proved beyond question by the decreased amount of carbon dioxid
thrown off in the expired breath of any person who has used alcoholics.

The enfeebled respiration explains (though it is only one of the reasons)
why inebriates cannot endure vigorous and prolonged exertion as can a
healthy person. The hurried circulation produced by intoxicants involves
in turn quickened respiration, which means more rapid exhaustion of the
life forces. The use of intoxicants involves a repeated dilatation of the
capillaries, which steadily diminishes their defensive power, rendering
the person more liable to yield to the invasion of pulmonary diseases.[38]

230. Effect of Alcoholics upon Disease. A theory has prevailed, to a
limited extent, that the use of intoxicants may act as a preventive of
consumption. The records of medical science fail to show any proof
whatever to support this impression. No error could be more serious or
more misleading, for the truth is in precisely the opposite direction.
Instead of preventing, alcohol tends to develop consumption. Many
physicians of large experience record the existence of a distinctly
recognized alcoholic consumption, attacking those constitutions broken
down by dissipation. This form of consumption is steadily progressive, and
always fatal.

The constitutional debility produced by the habit of using alcoholic
beverages tends to render one a prompt victim to the more severe diseases,
as pneumonia, and especially epidemical diseases, which sweep away vast
numbers of victims every year.

231. Effect of Tobacco upon the Respiratory Passages. The effects of
tobacco upon the throat and lungs are frequently very marked and
persistent. The hot smoke must very naturally be an irritant, as the mouth
and nostrils were not made as a chimney for heated and narcotic vapors.
The smoke is an irritant, both by its temperature and from its destructive
ingredients, the carbon soot and the ammonia which it conveys. It
irritates and dries the mucous membrane of the mouth and throat, producing
an unnatural thirst which becomes an enticement to the use of intoxicating
liquors. The inflammation of the mouth and throat is apt to extend up the
Eustachian tube, thus impairing the sense of hearing.

But even these are not all the bad effects of tobacco. The inhalation of
the poisonous smoke produces unhealthful effects upon the delicate mucous
membrane of the bronchial tubes and of the lungs. Upon the former the
effect is to produce an irritating cough, with short breath and chronic
bronchial catarrh. The pulmonary membrane is congested, taking cold
becomes easy, and recovery from it tedious. Frequently the respiration is
seriously disturbed, thus the blood is imperfectly aërated, and so in turn
the nutrition of the entire system is impaired. The cigarette is the
defiling medium through which these direful results frequently invade the
system, and the easily moulded condition of youth yields readily to the
destructive snare.

"The first effect of a cigar upon any one demonstrates that tobacco can
poison by its smoke and through the lungs."--London _Lancet_.

"The action of the heart and lungs is impaired by the influence of the
narcotic on the nervous system, but a morbid state of the larynx, trachea,
and lungs results from the direct action of the smoke."--Dr. Laycock,
Professor of Medicine in the University of Edinburgh.



Additional Experiments.

  Experiment 114. _To illustrate the arrangement of the lungs and the
  two pleuræ._ Place a large sponge which will represent the lungs in a
  thin paper bag which just fits it; this will represent the pulmonary
  layer of the pleura. Place the sponge and paper bag inside a second
  paper bag, which will represent the parietal layer of the pleura. Join
  the mouths of the two bags. The two surfaces of the bags which are now
  in contact will represent the two moistened surfaces of the pleuræ,
  which rub together in breathing.

  Experiment 115. _To show how the lungs may be filled with air._
  Take one of the lungs saved from Experiment 110. Tie a glass tube six
  inches long into the larynx. Attach a piece of rubber to one end of the
  glass tube. Now inflate the lung several times, and let it collapse.
  When distended, examine every part of it.

  Experiment 116. _To take your own bodily temperature or that of a
  friend._ If you cannot obtain the use of a physician's clinical
  thermometer, unfasten one of the little thermometers found on so many
  calendars and advertising sheets. Hold it for five minutes under the
  tongue with the lips closed. Read it while in position or the instant it
  is removed. The natural temperature of the mouth is about 98½° F.

  Experiment 117. _To show the vocal cords._ Get a pig's windpipe in
  perfect order, from the butcher, to show the vocal cords. Once secured,
  it can be kept for an indefinite time in glycerine and water or dilute
  alcohol.

  Experiment 118. _To show that the air we expire is warm._ Breathe
  on a thermometer for a few minutes. The mercury will rise rapidly.

  Experiment 119. _To show that expired cur is moist_. Breathe on a
  mirror, or a knife blade, or any polished metallic surface, and note the
  deposit of moisture.

  Experiment 120. _To show that the expired air contains carbon
  dioxid_. Put a glass tube into a bottle of lime water and breathe
  through the tube. The A liquid will soon become cloudy, because the
  carbon dioxid of the expired air throws down the lime held in solution.

  Experiment 121. "A substitute for a clinical thermometer may be
  readily contrived by taking an ordinary house thermometer from its tin
  case, and cutting off the lower part of the scale so that the bulb may
  project freely. With this instrument the pupils may take their own and
  each other's temperatures, and it will be found that whatever the season
  of the year or the temperature of the room, the thermometer in the mouth
  will record about 99° F. Care must, of course, be taken to keep the
  thermometer in the mouth till it ceases to rise, and to read while it is
  still in position."--Professor H. P. Bowditch.

  Experiment 122. _To illustrate the manner in which the movements of
  inspiration cause the air to enter the lungs._ Fit up an apparatus, as
  represented in Fig. 95, in which a stout glass tube is provided with a
  sound cork, B, and also an air-tight piston, D, resembling that of an
  ordinary syringe. A short tube, A, passing through the cork, has a small
  India-rubber bag, C, tied to it. Fit the cork in the tube while the
  piston is near the top. Now, by lowering the piston we increase the
  capacity of the cavity containing the bag. The pressure outside the bag
  is thus lowered, and air rushes into it through the tube, A, till a
  balance is restored. The bag is thus stretched. As soon as we let go the
  piston, the elasticity of the bag, being free to act, Movements of
  drives out the air just taken in, and the piston returns to its former
  place.

  [Illustration: Fig. 95. Apparatus for Illustrating the Movements of
  Respiration.]

  It will be noticed that in this experiment the elastic bag and its tube
  represent the lungs and trachea; and the glass vessel enclosing it, the
  thorax.

For additional experiments on the mechanics of respiration, see Chapter
XV.




Chapter IX.

The Skin and the Kidneys.



232. The Elimination of Waste Products. We have traced the food from
the alimentary canal into the blood. We have learned that various food
materials, prepared by the digestive processes, are taken up by the
branches of the portal vein, or by the lymphatics, and carried into the
blood current. The nutritive material thus absorbed is conveyed by the
blood plasma and the lymph to the various tissues to provide them with
nourishment.

We have learned also that oxygen, taken up in the air cells of the lungs,
is being continually carried to the tissues, and that the blood is
purified by being deprived in the lungs of its excess of carbon dioxid.
From this tissue activity, which is mainly oxidation, are formed certain
waste products which, as we have seen, are absorbed by the capillaries and
lymphatics and carried into the venous circulation.

In their passage through the blood and tissues, the albumens, sugars,
starches, and fats are converted into carbon dioxid, water, and urea, or
some closely allied body. Certain articles of food also contain small
amounts of sulphur and phosphorus, which undergo oxidation into sulphates
and phosphates. We speak, then, of carbon dioxid, salts, and water as
waste products of the animal economy. These leave the body by one of
the three main channels,--the lungs, the skin, or the kidneys.

The elimination of these products is brought about by a special apparatus
called organs of excretion. The worn-out substances themselves
are called excretions, as opposed to secretions, which are
elaborated for use in the body. (See note, p. 121.) As already shown, the
lungs are the main channels for the elimination of carbon dioxid, and
of a portion of water as vapor. By the skin the body gets rid of a
small portion of salts, a little carbon dioxid, and a large
amount of water in the form of perspiration. From the kidneys
are eliminated nearly all the urea and allied bodies, the main
portion of the salts, and a large amount of water. In fact,
practically all the nitrogenous waste leaves the body by the kidneys.

[Illustration: Fig. 96.--Diagrammatic Scheme to illustrate in a very
General Way Absorption and Excretion.

  A, represents the alimentary canal;
  L, the pulmonary surface;
  K, the surface of the renal epithelium;
  S, the skin;
  o, oxygen;
  h, hydrogen,;
  n, nitrogen.
]


233. The Skin. The skin is an important and unique organ of the
body. It is a blood-purifying organ as truly as are the lungs and the
kidneys, while it also performs other and complex duties. It is not merely
a protective covering for the surface of the body. This is indeed the most
apparent, but in some respectes, the lest important, of its functions.
This protective duty is necessary and efficient, as is proved by the
familiar experience of the pain when a portion of the outer skin has been
removed.

The skin, being richly supplied with nerves, is an important organ of
sensibility and touch. In some parts it is closely attached to
the structures beneath, while in others it is less firmly adherent and
rests upon a variable amount of fatty tissue. It thus assists in relieving
the abrupt projections and depressions of the general surface, and in
giving roundness and symmetry to the entire body. The thickness of the
skin varies in different parts of the body. Where exposed to pressure and
friction, as on the soles of the feet and in the palms of the hands, it is
much thickened.

The true skin is 1/12 to ⅛ of an inch in thickness, but in certain
parts, as in the lips and ear passages, it is often not more than 1/100 of
an inch thick. At the orifices of the body, as at the mouth, ears, and
nose, the skin gradually passes into mucous membrane, the structure of the
two being practically identical. As the skin is an outside covering, so is
the mucous membrane a more delicate inside lining for all cavities into
which the apertures open, as the alimentary canal and the lungs.

[Illustration: Fig. 97.--A Layer of the Cuticle from the Palm of the Hand.
(Detached by maceration.)]

The skin ranks as an important organ of excretion, its product being
sweat, excreted by the sweat glands. The amount of this excretion
evaporated from the general surface is very considerable, and is modified
as becomes necessary from the varied conditions of the temperature. The
skin also plays an important part in regulating the bodily
temperature(sec. 241).

234. The Cutis Vera, or True Skin. The skin is remarkably complex in
its structure, and is divided into two distinct layers, which may be
readily separated: the deeper layer,--the true skin, dermis, or
corium; and the superficial layer, or outer skin,--the epidermis,
cuticle, or scarf skin.

The true skin consists of elastic and white fibrous tissue, the
bundles of which interlace in every direction. Throughout this feltwork
structure which gradually passes into areolar tissue are numerous muscular
fibers, as about the hair-follicles and the oil glands. When these tiny
muscles contract from cold or by mental emotion, the follicles project
upon the surface, producing what is called "goose flesh."

The true skin is richly supplied with blood-vessels and nerves, as when
cut it bleeds freely, and is very sensitive. The surface of the true skin
is thrown into a series of minute elevations called the papillæ, upon
which the outer skin is moulded. These abound in blood-vessels,
lymphatics, and peculiar nerve-endings, which will be described in
connection with the organ of touch (sec. 314). The papillæ are large
and numerous in sensitive places, as the palms of the hands, the soles of
the feet, and the fingers. They are arranged in parallel curved lines, and
form the elevated ridges seen on the surface of the outer skin (Fig. 103).

235. The Epidermis, or Cuticle. Above the true skin is the epidermis.
It is semi-transparent, and under the microscope resembles the scales of a
fish. It is this layer that is raised by a blister.

As the epidermis has neither blood-vessels, nerves, nor lymphatics,
it may be cut without bleeding or pain. Its outer surface is marked with
shallow grooves which correspond to the deep furrows between the papillæ
of the true skin. The inner surface is applied directly to the papillary
layer of the true skin, and follows closely its inequalities. The outer
skin is made up of several layers of cells, which next to the true skin
are soft and active, but gradually become harder towards the surface,
where they are flattened and scale-like. The upper scales are continually
being rubbed off, and are replaced by deeper cells from beneath. There are
new cells continually being produced in the deeper layer, which push
upward the cells already existing, then gradually become dry, and are cast
off as fine, white dust. Rubbing with a coarse towel after a hot bath
removes countless numbers of these dead cells of the outer skin. During
and after an attack of scarlet fever the patient "peels," that is, sheds
an unusual amount of the seal; cells of the cuticle.

The deeper and more active layer of the epidermis, the _mucosum_, is made
up of cells some of which contain minute granules of pigment, or coloring
matter, that give color to the skin. The differences in the tint, as
brunette, fair, and blond, are due mainly to the amount of coloring matter
in these pigment cells. In the European this amount is generally small,
while in other peoples the color cells may be brown, yellow, or even
black. The pinkish tint of healthy skin, and the rosy-red after a bath are
due, not to the pigment cells, but to the pressure of capillaries in the
true skin, the color of the blood being seen through the semi-transparent
outer skin.

[Illustration: Fig. 98.--Surface of the Palm of the Hand, showing the
Openings of the Sweat Glands and the Grooves between the Papillæ of the
Skin. (Magnified 4 diameters.) [In the smaller figure the same epidermal
surface is shown, as seen with the naked eye.]]

  Experiment 123. Of course the living skin can be examined only in a
  general way. Stretch and pull it, and notice that it is elastic. Note
  any liver spots, white scars, moles, warts, etc. Examine the outer skin
  carefully with a strong magnifying glass. Study the papillæ on the
  palms. Scrape off with a sharp knife a few bits of the scarf skin, and
  examine them with the microscope.

236. The Hair. Hairs varying in size cover nearly the entire body,
except a few portions, as the upper eyelids, the palms of the hands, and
the soles of the feet.

The length and diameter of the hairs vary in different persons, especially
in the long, soft hairs of the head and beard. The average number of hairs
upon a square inch of the scalp is about 1000, and the number upon the
entire head is estimated as about 120,000.

Healthy hair is quite elastic, and may be stretched from one-fifth to
one-third more than its original length. An ordinary hair from the head
will support a weight of six to seven ounces. The hair may become strongly
electrified by friction, especially when brushed vigorously in cold, dry
weather. Another peculiarity of the hair is that it readily absorbs
moisture.

237. Structure of the Hair. The hair and the nails are structures
connected with the skin, being modified forms of the epidermis. A hair is
formed by a depression, or furrow, the inner walls of which consist of the
infolded outer skin. This depression takes the form of a sac and is called
the hair-follicle, in which the roots of the hair are embedded. At
the bottom of the follicle there is an upward projection of the true skin,
a papilla, which contains blood-vessels and nerves. It is covered
with epidermic cells which multiply rapidly, thus accounting for the rapid
growth of the hair. Around each papilla is a bulbous expansion, the hair
bulb, from which the hair begins to grow.

[Illustration: Fig. 99.--Epidermis of the Foot.

It will be noticed that there are only a few orifices of the sweat glands
in this region. (Magnified 8 diameters.)]

The cells on the papillæ are the means by which the hairs grow. As these
are pushed upwards by new ones formed beneath, they are compressed, and
the shape of the follicle determines their cylindrical growth, the shaft
of the hair. So closely are these cells welded to form the cylinder, that
even under a microscope the hair presents only a fibrous appearance,
except in the center, where the cells are larger, forming the
medulla, or pith (Fig. 106).

The medulla of the hair contains the pigment granules or coloring matter,
which may be of any shade between a light yellow and an intense black. It
is this that gives the great variety in color. Generally with old people
the pigment is absent, the cells being occupied by air; hence the hair
becomes gray or white. The thin, flat scales on the surface of the hair
overlap like shingles. Connected with the hair-follicles are small bundles
of muscular fibers, which run obliquely in the skin and which, on
shortening, may cause the hairs to become more upright, and thus are made
to "stand on end." The bristling back of an angry cat furnishes a familiar
illustration of this muscular action.

[Illustration: Fig. 100.--Hair and Hair-Follicle.

  A, root of hair;
  B, bulb of the hair;
  C, internal root sheath;
  D, external root sheath;
  E, external membrane of follicle;
  F, muscular fibers attached to the follicle;
  H, compound sebaceous gland with its duct;
  K, L, simple sebaceous gland;
  M, opening of the hair-follicle.
]

Opening into each hair-follicle are usually one or more sebaceous, or
oil, glands. These consist of groups of minute pouches lined with
cells producing an oily material which serves to oil the hair and keep the
skin moist and pliant.

238. The Nails. The nails are also formed of epidermis cells
which have undergone compression, much like those forming the shaft of a
hair. In other words, a nail is simply a thick layer of horny scales built
from the outer part of the scarf skin. The nail lies upon very fine and
closely set papillæ, forming its matrix, or bed. It is covered at its
base with a fold of the true skin, called its root, from beneath
which it seems to grow.

The growth of the nail, like that of the hair and the outer skin, is
effected by the production of new cells at the root and under surface. The
growth of each hair is limited; in time it falls out and is replaced by a
new one. But the nail is kept of proper size simply by the removal of its
free edge.

239. The Sweat Glands. Deep in the substance of the true skin, or in
the fatty tissue beneath it, are the sweat glands. Each gland
consists of a single tube with a blind end, coiled in a sort of ball about
1/60 of an inch in diameter. From this coil the tube passes upwards
through the dermis in a wavy course until it reaches the cuticle, which it
penetrates with a number of spiral turns, at last opening on the surface.
The tubes consist of delicate walls of membrane lined with cells. The coil
of the gland is enveloped by minute blood-vessels. The cells of the glands
are separated from the blood only by a fine partition, and draw from it
whatever supplies they need for their special work.

[Illustration: Fig. 101.--Concave or Adherent Surface of the Nail.

  A, border of the root;
  B, whitish portion of semilunar shape (the lunula);
  C, body of nail. The continuous line around border represents the free
     edge.
]

[Illustration: Fig. 102.--Nail in Position.

  A, section of cutaneous fold (B) turned back to show the root of the
     nail;
  B, cutaneous fold covering the root of the nail;
  C, semi lunar whitish portion (lunula);
  D, free border.
]

With few exceptions every portion of the skin is provided with sweat
glands, but they are not equally distributed over the body. They are
fewest in the back and neck, where it is estimated they average 400 to the
square inch. They are thickest in the palms of the hands, where they
amount to nearly 3000 to each square inch. These minute openings occur in
the ridges of the skin, and may be easily seen with a hand lens. The
length of a tube when straightened is about 1/4 of an inch. The total
number in the body is estimated at about 2,500,000, thus making the entire
length of the tubes devoted to the secretion of sweat about 10 miles.

240. Nature and Properties of Sweat. The sweat is a turbid, saltish
fluid with a feeble but characteristic odor due to certain volatile fatty
acids. Urea is always present in small quantities, and its proportion may
be largely increased when there is deficiency of elimination by the
kidneys. Thus it is often observed that the sweat is more abundant when
the kidneys are inactive, and the reverse is true. This explains the
increased excretion of the kidneys in cold weather. Of the inorganic
constituents of sweat, common salt is the largest and most important. Some
carbon dioxid passes out through the skin, but not more than 1/50 as much
as escapes by the lungs.

The sweat ordinarily passes off as vapor. If there is no obvious
perspiration we must not infer that the skin is inactive, since sweat is
continually passing from the surface, though often it may not be apparent.
On an average from 1-1/2 to 4 pounds of sweat are eliminated daily from
the skin in the form of vapor. This is double the amount excreted by the
lungs, and averages about 1/67 of the weight of the body.

The visible sweat, or sensible perspiration, becomes abundant during
active exercise, after copious drinking of cold water, on taking certain
drugs, and when the body is exposed to excessive warmth. Forming more
rapidly than it evaporates it collects in drops on the surface. The
disagreeable sensations produced by humid weather result from the fact
that the atmosphere is so loaded with vapor that the moisture of the skin
is slowly removed by evaporation.

  Experiment 124. Study the openings of the sweat glands with the aid
  of a strong magnifying glass. They are conveniently examined on the
  palms.

A man's weight may be considerably reduced within a short time by loss
through the perspiration alone. This may explain to some extent the
weakening effect of profuse perspiration, as from night sweats of
consumption, convalescence from typhoid fever, or the artificial sweating
from taking certain drugs.


241. The Skin as a Regulator of the Temperature of the Body. We thus
learn that the skin covers and protects the more delicate structures
beneath it; and that it also serves as an important organ of excretion. By
means of the sweat the skin performs a third and a most important
function, _viz_., that of regulating the temperature of the body.

The blood-vessels of the skin, like those of other parts of the body, are
under the control of the nervous system, which regulates their diameter.
If the nervous control be relaxed, the blood-vessels dilate, more blood
flows through them, and more material is brought to the glands of the skin
to be acted upon. External warmth relaxes the skin and its blood-vessels.
There results an increased flow of blood to the skin, with increased
perspiration. External cold, on the other hand, contracts the skin and its
blood-vessels, producing a diminished supply of blood and a diminished
amount of sweat.

Now, it is a law of physics that the change from liquid to vapor involves
a loss of heat. A few drops of ether or of any volatile liquid placed on
the skin, produce a marked sense of coldness, because the heat necessary
to change the liquid into vapor has been drawn rapidly from the skin. This
principle holds good for every particle of sweat that reaches the mouth of
a sweat gland. As the sweat evaporates, it absorbs a certain amount of
heat, and cools the body to that extent.


242. How the Action of the Skin may be Modified. After profuse
sweating we feel chilly from the evaporation of a large amount of
moisture, which rapidly cools the surface. When the weather is very warm
the evaporation tends to prevent the bodily temperature from rising. On
the other hand, if the weather be cold, much less sweat is produced, the
loss of heat from the body is greatly lessened, and its temperature
prevented from falling. Thus it is plain why medicine is given and other
efforts are made to sweat the fever patient. The increased activity of the
skin helps to reduce the bodily heat.

The sweat glands are under the control of certain nerve fibers originating
in the spinal cord, and are not necessarily excited to action by an
increased flow of blood through the skin. In other words, the sweat glands
may be stimulated to increased action both by an increased flow of blood,
and also by reflex action upon the vaso-dilator nerves of the parts. These
two agencies, while working in harmony through the vaso-dilators, produce
phenomena which are essentially independent of each other. Thus a strong
emotion, like fear, may cause a profuse sweat to break out, with cold,
pallid skin. During a fever the skin may be hot, and its vessels full of
blood, and yet there may be no perspiration.

[Illustration: Fig. 103.--Papillæ of the Skin of the Palm of the Hand.

In each papilla are seen vascular loops (dark lines) running up from the
vascular network below, the tactile corpuscles with their nerve branches
(white lines) which supply the papillæ.]

The skin may have important uses with which we are not yet acquainted.
Death ensues when the heat of the body has been reduced to about 70° F.,
and suppression of the action of the skin always produces a lowering of
the temperature. Warm-blooded animals usually die when more than half of
the general surface has been varnished. Superficial burns which involve a
large part of the surface of the body, generally have a fatal result due
to shock.

If the skin be covered with some air-tight substance like a coating of
varnish, its functions are completely arrested. The bodily heat falls very
rapidly. Symptoms of blood-poisoning arise, and death soon ensues. The
reason is not clearly known, unless it be from the sudden retention of
poisonous exhalations.

243. The Skin and the Kidneys. There is a close relationship between
the skin and the kidneys, as both excrete organic and saline matter. In
hot weather, or in conditions producing great activity of the skin, the
amount of water excreted by the kidneys is diminished. This is shown in
the case of firemen, stokers, bakers, and others who are exposed to great
heat, and drink heavily and sweat profusely, but do not have a relative
increase in the functions of the kidneys. In cool weather, when the skin
is less active, a large amount of water is excreted by the kidneys, as is
shown by the experience of those who drive a long distance in severe
weather, or who have caught a sudden cold.

[Illustration: Fig. 104.--Magnified View of a Sweat Gland with its Duct.

The convoluted gland is seen surrounded with big fat-cells, and may be
traced through the dermis to its outlet in the horny layers of the
epidermis.]

244. Absorbent Powers of the Skin. The skin serves to some extent as
an organ for absorption. It is capable of absorbing certain
substances to which it is freely exposed. Ointments rubbed in, are
absorbed by the lymphatics in those parts where the skin is thin, as in
the bend of the elbow or knee, and in the armpits. Physicians use
medicated ointments in this way, when they wish to secure prompt and
efficient results. Feeble infants often grow more vigorous by having their
skin rubbed vigorously daily with olive oil.

A slight amount of water is absorbed in bathing. Sailors deprived of
fresh water have been able to allay partially their intense thirst by
soaking their clothing in salt water. The extent to which absorption
occurs through the healthy skin is, however, quite limited. If the outer
skin be removed from parts of the body, the exposed surface absorbs
rapidly. Various substances may thus be absorbed, and rapidly passed into
the blood. When the physician wishes remedies to act through the skin, he
sometimes raises a small blister, and dusts over the surface some drug, a
fine powder, like morphine.

The part played by the skin as an organ of touch will be considered
in sections 314 and 315.

  Experiment 125. _To illustrate the sense of temperature_. Ask the
  person to close his eyes. Use two test tubes, one filled with cold and
  the other with hot water, or two spoons, one hot and one cold. Apply
  each to different parts of the surface, and ask the person whether the
  touching body is hot or cold. Test roughly the sensibility of different
  parts of the body with cold and warm metallic-pointed rods.

  Experiment 126. Touch fur, wood, and metal. The metal feels
  coldest, although all the objects are at the same temperature. Why?

  Experiment 127. Plunge the hand into water at about 97°F. One
  experiences a feeling of heat. Then plunge it into water at about 86°F.;
  at first it feels cold, because heat is abstracted from the hand. Plunge
  the other hand direct into water at 86°F. without previously placing it
  in water at 97°F.,--it will feel pleasantly warm.

  Experiment 128. _To illustrate warm and cold spots_. With a blunt
  metallic point, touch different parts of the skin. Certain points excite
  the sensation of warmth, others of cold, although the temperatures of
  the skin and of the instrument remain constant.

245. Necessity for Personal Cleanliness. It is evident that the skin,
with its myriads of blood-vessels, nerves, and sweat and oil glands, is an
exceedingly complicated and important structure. The surface is
continually casting off perspiration, oily material, and dead scales. By
friction and regular bathing we get rid of these waste materials. If this
be not thoroughly done, the oily secretion holds the particles of waste
substances to the surface of the body, while dust and dirt collect, and
form a layer upon the skin. When we remember that this dirt consists of a
great variety of dust particles, poisonous matters, and sometimes germs of
disease, we may well be impressed with the necessity of personal
cleanliness.

This layer of foreign matter on the skin is in several ways injurious to
health. It clogs the pores and retards perspiration, thus checking the
proper action of the skin as one of the chief means of getting rid of the
waste matters of the body. Hence additional work is thrown upon other
organs, chiefly the lungs and the kidneys, which already have enough to
do. This extra work they can do for only a short time. Sooner or later
they become disordered, and illness follows. Moreover, as this unwholesome
layer is a fertile soil in which bacteria may develop, many skin diseases
may result from this neglect. It is also highly probable that germs of
disease thus adherent to the skin may then be absorbed into the system.
Parasitic skin diseases are thus greatly favored by the presence of an
unclean skin. It is also a fact that uncleanly people are more liable to
take cold than those who bathe often.

The importance of cleanliness would thus seem too apparent to need special
mention, were it not that the habit is so much neglected. The old and
excellent definition that dirt is suitable matter, but in the wrong place,
suggests that the place should be changed. This can be done only by
regular habits of personal cleanliness, not only of the skin, the hair,
the teeth, the nails, and the clothing, but also by the rigid observance
of a proper system in daily living.

246. Baths and Bathing. In bathing we have two distinct objects in
view,--to keep the skin clean and to impart vigor. These are closely
related, for to remove from the body worn-out material, which tends to
injure it, is a direct means of giving vigor to all the tissues. Thus a
cold bath acts upon the nervous system, and calls out, in response to the
temporary abstraction of heat, a freer play of the general vital powers.
Bathing is so useful, both locally and constitutionally, that it
should be practiced to such an extent as experience proves to be
beneficial. For the general surface, the use of hot water once a week
fulfills the demands of cleanliness, unless in special occupations.
Whether we should bathe in hot or cold water depends upon circumstances.
Most persons, especially the young and vigorous, soon become accustomed to
cool, and even cold water baths, at all seasons of the year.

The hot bath should be taken at night before going to bed, as in the
morning there is usually more risk of taking cold. The body is readily
chilled, if exposed to cold when the blood-vessels of the skin have been
relaxed by heat. Hot baths, besides their use for the purposes of
cleanliness, have a sedative influence upon the nervous system, tending to
allay restlessness and weariness. They are excellent after severe physical
or mental work, and give a feeling of restful comfort like that of sleep.

[Illustration: Fig. 105.--Epithelial Cells from the Sweat Glands. The
cells are very distinct, with nuclei enclosing pigmentary granulations
(Magnified 350 times)]

Cold baths are less cleansing than hot, but serve as an excellent
tonic and stimulant to the bodily functions. The best and most convenient
time for a cold bath is in the morning, immediately after rising. To the
healthy and vigorous, it is, if taken at this time, with proper
precautions, a most agreeable and healthful luxury. The sensation of
chilliness first felt is caused by the contraction of the skin and its
blood-vessels, so that the blood is forced back, as it were, into the
deeper parts of the body. This stimulates the nervous system, the
breathing becomes quicker and deeper, the heart beats more vigorously,
and, as a consequence, the warm blood is sent back to the skin with
increased force. This is known as the stage of reaction, which is best
increased by friction with a rough towel. This should produce the pleasant
feeling of a warm glow all over the body.

A cold bath which is not followed by reaction is likely to do more harm
than good. The lack of this reaction may be due to the water being too
cold, the bath too prolonged, or to the bather being in a low condition of
health. In brief, the ruddy glow which follows a cold bath is the main
secret of its favorable influence.

The temperature of the water should be adapted to the age and strength of
the bather. The young and robust can safely endure cold baths, that would
be of no benefit but indeed an injury to those of greater age or of less
vigorous conditions of health. After taking a bath the skin should be
rapidly and vigorously rubbed dry with a rough towel, and the clothing at
once put on.

247. Rules and Precautions in Bathing. Bathing in cold water should
not be indulged in after severe exercise or great fatigue, whether we are
heated or not. Serious results have ensued from cold baths when the body
is in a state of exhaustion or of profuse perspiration. A daily cold bath
when the body is comfortably warm, is a safe tonic for almost all persons
during the summer months, and tends especially to restore the appetite.
Cold baths, taken regularly, render persons who are susceptible to
colds much less liable to them, and less likely to be disturbed by sudden
changes of temperature. Persons suffering from heart disease or from
chronic disease of an important organ should not indulge in frequent cold
bathing except by medical advice. Owing to the relaxing nature of hot
baths, persons with weak hearts or suffering from debility may faint while
taking them.

Outdoor bathing should not be taken for at least an hour after a
full meal, and except for the robust it is not prudent to bathe with the
stomach empty, especially before breakfast. It is a wise rule, in outdoor
or sea bathing, to come out of the water as soon as the glow of reaction
is felt. It is often advisable not to apply cold water very freely to the
head. Tepid or even hot water is preferable, especially by those subject
to severe mental strain. But it is often a source of great relief during
mental strain to bathe the face, neck, and chest freely at bedtime with
cold water. It often proves efficient at night in calming the
sleeplessness which results from mental labor.

Hot baths, if taken at bedtime, are often serviceable in preventing a
threatened cold or cutting it short, the patient going immediately to bed,
with extra clothing and hot drinks. The free perspiration induced helps to
break up the cold.

Salt water acts more as a stimulant to the skin than fresh water.
Salt-water bathing is refreshing and invigorating for those who are
healthy, but the bather should come out of the water the moment there is
the slightest feeling of chilliness. The practice of bathing in salt water
more than once a day is unhealthful, and even dangerous. Only the
strongest can sustain so severe a tax on their power of endurance. Sea
bathing is beneficial in many ways for children, as their skin reacts well
after it. In all cases, brisk rubbing with a rough towel should be had
afterwards.

[Illustration: Fig. 106.--Magnified Section of the Lower Portion of a Hair
and Hair-Follicle.

  A, membrane of the hair-follicle, cells with nuclei and pigmentary
     granules;
  B, external lining of the root sheath;
  C, internal lining of the root sheath;
  D, cortical or fibrous portion of the hair shaft;
  E, medullary portion (pith) of shaft;
  F, hair-bulb, showing its development from cells from A.
]

The golden rule of all bathing is that it must never be followed by a
chill. If even a chilliness occur after bathing, it must immediately
be broken up by some appropriate methods, as lively exercise, brisk
friction, hot drinks, and the application of heat.

Swimming is a most valuable accomplishment, combining bathing and
exercise. Bathing of the feet should never be neglected. Cleanliness of
the hair is also another matter requiring strict attention, especially in
children.

248. Care of the Hair and Nails. The hair brush should not be too
stiff, as this increases the tendency towards scurfiness of the head. If,
however, the hair is brushed too long or too hard, the scalp is greatly
stimulated, and an increased production of scurf may result. If the head
be washed too often with soap its natural secretion is checked, and the
scalp becomes dry and scaly. The various hair pomades are as a rule
undesirable and unnecessary.

The nails should be kept in proper condition, else they are not only
unsightly, but may serve as carriers of germs of disease. The nails are
often injured by too much interference, and should never be trimmed to the
quick. The upper surfaces should on no account be scraped. The nail-brush
is sufficient to cleanse them without impairing their smooth and polished
surfaces.

[Illustration: Fig. 107.--Longitudinal Section of a Finger-Nail.

  A, last phalanx of the fingers;
  B, true skin on the dorsal surface of the finger;
  C, epidermis;
  D, true skin;
  E, bed of the nail;
  F, superficial layer of the nail;
  H, true skin of the pulp of the finger.
]

249. Use of Clothing. The chief use of clothing, from a hygienic
point of view, is to assist in keeping the body at a uniform temperature.
It also serves for protection against injury, and for personal adornment.
The heat of the body, as we have learned, is normally about 98 1/2° F.
This varies but slightly in health. A rise of temperature of more than one
degree is a symptom of disturbance. The normal temperature does not vary
with the season. In summer it is kept down by the perspiration and its
rapid evaporation. In winter it is maintained by more active oxidation, by
extra clothing, and by artificial heat.

The whole matter of clothing is modified to a great extent by climatic
conditions and local environments,--topics which do not come
within the scope of this book.

250. Material Used for Clothing. It is evident that if clothing is to
do double duty in preventing the loss of heat by radiation, and in
protecting us from the hot rays of the sun, some material must be used
that will allow the passage of heat in either direction. The ideal
clothing should be both a bad conductor and a radiator of heat. At the
same time it must not interfere with the free evaporation of the
perspiration, otherwise chills may result from the accumulation of
moisture on the surface of the body.

Wool is a bad conductor, and should be worn next the skin, both in
summer and winter, especially in variable climates. It prevents, better
than any other material, the loss of heat from the body, and allows free
ventilation and evaporation. Its fibers are so lightly woven that they
make innumerable meshes enclosing air, which is one of the best of
non-conductors.

Silk ranks next to wool in warmth and porosity. It is much softer and
less irritating than flannel or merino, and is very useful for summer
wear. The practical objection to its general use is the expense. Fur
ranks with wool as a bad conductor of heat. It does not, however, like
wool, allow of free evaporation. Its use in cold countries is universal,
but in milder climates it is not much worn.

Cotton and linen are good conductors of heat, but are not
absorbents of moisture, and should not be worn next the skin. They are,
however, very durable and easily cleansed. As an intermediate clothing
they may be worn at all seasons, especially over wool or silk. Waterproof
clothing is also useful as a protection, but should not be worn a longer
time than necessary, as it shuts in the perspiration, and causes a sense
of great heat and discomfort.

The color of clothing is of some importance, especially if exposed
directly to the sun's rays. The best reflectors, such as white and light
gray clothing, absorb comparatively little heat and are the coolest, while
black or dark-colored materials, being poor reflectors and good
absorbents, become very warm.

251. Suggestions for the Use of Clothing. Prudence and good sense
should guide us in the spring, in changing winter flannels or clothing for
fabrics of lighter weight. With the fickle climate in most sections of
this country, there are great risks of severe colds, pneumonia, and other
pulmonary diseases from carelessness or neglect in this matter. A change
from heavy to lighter clothing should be made first in the outer garments,
the underclothing being changed very cautiously.

The two essentials of healthful clothing are cleanliness and
dryness. To wear garments that are daily being soiled by perspiration
and other cutaneous excretions, is a most uncleanly and unhealthful
practice. Clothing, especially woolen underclothing, should be frequently
changed. One of the objections to the use of this clothing is that it does
not show soiling to the same extent as do cotton and linen.

Infectious and contagious diseases may be conveyed by the clothing. Hence,
special care must be taken that all clothing in contact with sick people
is burned or properly disinfected. Children especially are susceptible to
scarlet fever, diphtheria, and measles, and the greatest care must be
exercised to prevent their exposure to infection through the clothing.

We should never sleep in a damp bed, or between damp sheets. The vital
powers are enfeebled during sleep, and there is always risk of pneumonia
or rheumatism. The practice of sitting with wet feet and damp clothing is
highly injurious to health. The surface of the body thus chilled may be
small, yet there is a grave risk of serious, if not of fatal, disease. No
harm may be done, even with clothing wet with water or damp with
perspiration, so long as exercise is maintained, but the failure or
inability to change into dry garments as soon as the body is at rest is
fraught with danger.

Woolen comforters, scarfs, and fur mufflers, so commonly worn around the
neck, are more likely to produce throat troubles and local chill than to
have any useful effect. Harm ensues from the fact that the extra covering
induces local perspiration, which enfeebles the natural defensive power of
the parts; and when the warmer covering is removed, the perspiring surface
is readily chilled. Those who never bundle their throats are least liable
to suffer from throat ailments.

252. Ill Effects of Wearing Tightly Fitting Clothing. The injury to
health caused by tight lacing, when carried to an extreme, is due to the
compression and displacement of various organs by the pressure exerted on
them. Thus the lungs and the heart may be compressed, causing short breath
on exertion, palpitation of the heart, and other painful and dangerous
symptoms. The stomach, the liver, and other abdominal organs are often
displaced, causing dyspepsia and all its attendant evils. The improper use
of corsets, especially by young women, is injurious, as they interfere
with the proper development of the chest and abdominal organs. The use of
tight elastics below the knee is often injurious. They obstruct the local
venous circulation and are a fruitful source of cold feet and of enlarged
or varicose veins.

Tightly fitting boots and shoes often cause corns, bunions, and ingrowing
nails; on the other hand, if too loosely worn, they cause corns from
friction. Boots too narrow in front crowd the toes together, make them
overlap, and render walking difficult and painful. High-heeled boots throw
the weight of the body forwards, so that the body rests too much on the
toes instead of on the heels, as it should, thus placing an undue strain
upon certain groups of muscles of the leg, in order to maintain the
balance, while other groups are not sufficiently exercised. Locomotion is
never easy and graceful, and a firm, even tread cannot be expected.

The compression of the scalp by a tight-fitting hat interferes with the
local circulation, and may cause headaches, neuralgia, or baldness, the
nutrition of the hair-follicles being diminished by the impaired
circulation. The compression of the chest and abdomen by a tight belt and
various binders interferes with the action of the diaphragm,--the most
important muscle of respiration.

253. Miscellaneous Hints on the Use of Clothing. Children and old
people are less able to resist the extreme changes of temperature than are
adults of an average age. Special care should be taken to provide children
with woolen underclothing, and to keep them warm and in well-ventilated
rooms. Neither the chest nor limbs of young children should be unduly
exposed, as is often done, to the cold blasts of winter or the fickle
weather of early spring. Very young children should not be taken out in
extremely cold weather, unless quite warmly clad and able to run about.
The absurd notion is often entertained that children should be hardened by
exposure to the cold. Judicious "hardening" means ample exposure of
well-fed and well-clothed children. Exposure of children not thus cared
for is simple cruelty. The many sicknesses of children, especially
diseases of the throat and lungs, may often be traced directly to gross
carelessness, ignorance, or neglect with reference to undue exposure. The
delicate feet of children should not be injured by wearing ill-fitting or
clumsy boots or shoes. Many deformities of the feet, which cause much
vexation and trouble in after years, are acquired in early life.

No one should sleep in any of the clothes worn during the day, not even in
the same underclothing. All bed clothing should be properly aired, by free
exposure to the light and air every morning. Never wear wet or damp
clothing one moment longer than necessary. After it is removed rub the
body thoroughly, put on at once dry, warm clothing, and then exercise
vigorously for a few minutes, until a genial glow is felt. Neglect of
these precautions often results in rheumatism, neuralgia, and diseases of
the chest, especially among delicate people and young women.

Pupils should not be allowed to sit in the schoolroom with any outer
garments on. A person who has become heated in a warm room should not
expose himself to cold without extra clothing. We must not be in a hurry
to put on heavy clothes for winter, but having once worn them, they must
not be left off until milder weather renders the change safe. The cheaper
articles of clothing are often dyed with lead or arsenic. Hence such
garments, like stockings and colored underclothing, worn next the skin
have been known to produce severe symptoms of poisoning. As a precaution,
all such articles should be carefully washed and thoroughly rinsed before
they are worn.



The Kidneys.


254. The Kidneys. The kidneys are two important organs in the
abdomen, one on each side of the spine. They are of a reddish-brown color,
and are enveloped by a transparent capsule made up of a fold of the
peritoneum. Embedded in fat, the kidneys lie between the upper lumbar
vertebræ, and the crest of the hip bone. The liver is above the right
kidney, and the spleen above the left, while both lie close against the
rear wall of the abdomen, with the intestines in front of them. The human
kidneys, though somewhat larger, are exactly of the same shape, color, and
general appearance as those of the sheep, so commonly seen in the markets.

The kidneys are about four inches long, two inches across, one inch thick,
and weigh from 41/2 to 51/2 ounces each. The hollow or concave side of the
kidneys is turned inwards, and the deep fissure of this side, known as the
hilus, widens out to form the pelvis. Through the hilus the
renal artery passes into each kidney, and from each hilus passes outwards
the renal vein, a branch of the inferior vena cava.

A tube, called the ureter, passes out from the concave border of each
kidney, turns downwards, and enters the bladder in the basin of the
pelvis. This tube is from 12 to 14 inches long, about as large as a goose
quill, and conveys the secretion of the kidneys to the bladder.

255. Structure of the Kidneys. The pelvis is surrounded by
reddish cones, about twelve in number, projecting into it, called the
pyramids of Malpighi. The apices of these cones, known as the
_papillæ_, are crowded with minute openings, the mouths of the
uriniferous tubules, which form the substance of the kidney. These
lie parallel in the medullary or central structure, but On reaching the
cortical or outer layer, they wind about and interlace, ending, at last,
in dilated closed sacs called Malpighian capsules.

[Illustration: Fig. 108.--Vertical Section of the Kidney.

  A, pyramids of Malpighi;
  B, apices, or papillæ, of the pyramids, surrounded by subdivisions of
     the pelvis known as cups or calices;
  C, pelvis of the kidney;
  D, upper end of ureter.
]

256. Function of the Kidneys. The Malpighian capsules are really the
beginning of the tubules, for here the work of excretion begins. The thin
wall of the capillaries within each capsule separates the blood from the
cavity of the tubule. The blood-pressure on the delicate capillary walls
causes the exudation of the watery portions of the blood through the cell
walls into the capsule. The epithelial cell membrane allows the water of
the blood with certain salts in solution to pass, but rejects the albumen.
From the capsules, the excretion passes through the tubules into the
pelvis, and on through the ureters to the bladder. But the delicate
epithelial walls of the tubules through which it passes permit the inflow
of urea and other waste products from the surrounding capillaries. By this
twofold process are separated from the blood the fluid portions of the
renal secretion with soluble salts, and the urea with other waste
material.

257. How the Action of the Kidneys may be Modified. The action of the
kidneys is subject to very marked and sudden modifications, especially
those operating through the nervous system. Thus whatever raises the
blood-pressure in the capillaries of the capsules, will increase the
quantity of fluid filtering through them. That is, the watery portion of
the secretion will be increased without necessarily adding to its solids.
So anything which lowers the blood-pressure will diminish the watery
portion of the secretion, that is, the secretion will be scanty, but
concentrated.

The Renal Secretion.--The function of the kidneys is to secrete a
fluid commonly known as the urine. The average quantity passed in 24 hours
by an adult varies from 40 to 60 fluid ounces. Normal urine consists of
about 96 per cent of water and 4 per cent of solids. The latter consist
chiefly of certain nitrogenous substances known as urea and uric acid, a
considerable quantity of mineral salts, and some coloring matter. Urea,
the most important and most abundant constituent of urine, contains the
four elements, but nitrogen forms one-half its weight. While, therefore,
the lungs expel carbon dioxid chiefly, the kidneys expel nitrogen. Both of
these substances express the result of oxidations going on in the body.
The urea and uric acids represent the final result of the breaking down in
the body of nitrogenous substances, of which albumen is the type.

Unusual constituents of the urine are _albumen, sugar_, and _bile_. When
albumen is present in urine, it often indicates some disease of the
kidneys, to which the term _albuminuria_ or Bright's Disease is applied.
The presence of grape sugar or glucose indicates the disease known as
diabetes. Bile is another unusual constituent of the urine, appearing in
_jaundice_.

The bladder is situated in the pelvic cavity or in the lowest part of
the abdomen. When full, the bladder is pear-shaped; when empty, it is
collapsed and lies low in the pelvis. The functions of the bladder are to
collect and retain the urine, which has reached it drop by drop from the
kidneys through the ureters, until a certain quantity accumulates, and
then to expel it from the body.

[Illustration: Fig. 109.--Vertical Section of the Back. (Showing kidneys
_in situ_ and the relative position of adjacent organs and vessels.)
[Posterior view.]

  A, 12th dorsal vertebra;
  B, diaphragm;
  C, receptaculum chyli;
  D, small intestines
]

In the kidneys, as elsewhere, the vaso-motor nerves are distributed
to the walls of the blood-vessels, and modify the quantity and the
pressure of blood in these organs. Thus, some strong emotion, like fear or
undue anxiety, increases the blood-pressure, drives more blood to the
kidneys, and causes a larger flow of watery secretion. When the atmosphere
is hot, there is a relaxation of the vessels of the skin, with a more
than ordinary flow of blood, which is thus withdrawn from the deeper
organs. The blood-pressure in the kidneys is not only diminished, but the
total quantity passing through them in a given time is much lessened. As a
result, the secretion of the kidneys is scanty, but it contains an unusual
percentage of solids.

When the atmosphere is cold, the reverse is true. The cutaneous vessels
contract, the blood is driven to the deeper organs with increased
pressure, and there is a less amount of sweat, but an increased renal
secretion, containing a smaller proportion of solids. Certain drugs have
the power of increasing or diminishing the renal secretion. As the waste
matters eliminated by the kidneys are being constantly produced in the
tissues, the action of the renal organs is continuous, in marked contrast
with the intermittent flow of most of the secretions proper, as
distinguished from the excretions.

258. Effects of Alcoholic Drinks upon the Kidneys. The kidneys differ
from some of the other organs in this: those can rest a while without any
harm to themselves, or to the body. We can keep the eyes closed for a few
days, if necessary, without injury, and in fact often with benefit; or, we
can abstain from food for some days, if need be, and let the stomach rest.
But the kidneys cannot, with safety, cease their work. Their duty in
ridding the blood of waste products, and of any foreign or poisonous
material introduced, must be done not only faithfully, but continually, or
the whole body at once suffers from the evil effects of the retained waste
matters.

This vital fact is the key to the injurious results developed in the
kidneys by the use of alcoholic drinks. These two organs have large
blood-vessels conveying full amounts of blood to and from their
structures, and they feel very quickly the presence of alcohol. Alcoholic
liquors excite and irritate the delicate renal membranes, and speedily
disturb and eventually destroy their capacity to excrete the proper
materials from the blood.

The continued congestion of the minute structure of the kidney cuts off
the needed nutrition of the organ, and forms the primary step in the
series of disasters. Sometimes from this continued irritation, with the
resulting inflammation, and sometimes from change of structure of the
kidney by fatty degeneration, comes the failure to perform its proper
function. Then, with this two-edged sword of disaster, the urea, which
becomes a poisonous element, and should be removed, is retained in the
system, while the albumen, which is essential to healthy blood, is
filtered away through the diseased kidney.

259. Alcoholic Liquors as a Cause of Bright's Disease. The
unfortunate presence of albumen in the urine is often a symptom of that
insidious and fatal malady known as _albuminuria_ or Bright's disease,
often accompanied with dropsy and convulsions. One of the most constant
causes of this disease is the use of intoxicants. It is not at all
necessary to this fatal result that a person be a heavy drinker. Steady,
moderate drinking will often accomplish the work. Kidney diseases produced
by alcoholic drinks, are less responsive to medical treatment and more
fatal than those arising from any other known cause.[39]

  Experiment 129. Obtain a sheep's kidney in good order. Observe that
  its shape is something like that of a bean, and note that the concave
  part (hilus), when in its normal position, is turned towards the
  backbone. Notice that all the vessels leave and enter the kidney at the
  hilus. Observe a small thick-walled vessel with open mouth from which
  may be pressed a few drops of blood. This is the renal artery. Pass a
  bristle down it. With the forceps, or even with a penknife, lift from
  the kidney the fine membrane enclosing it. This is the kidney capsule.

  Divide the kidney in halves by a section from its outer to near its
  inner border. Do not cut directly through the hilus. Note on the cut
  surfaces, on the outer side, the darker cortical portion, and on the
  inner side, the smooth, pale, medullary portion. Note also the pyramids
  of Malpighi.




Chapter X.

The Nervous System.



260. General View of the Nervous System. Thus far we have learned
something of the various organs and the manner in which they do their
work. Regarding our bodily structure as a kind of living machine, we have
studied its various parts, and found that each is designed to perform some
special work essential to the well-being of the whole. As yet we have
learned of no means by which these organs are enabled to adjust their
activities to the needs of other tissues and other organs. We are now
prepared to study a higher, a more wonderful and complex agency,--the
nervous system, the master tissue, which controls, regulates, and
directs every other tissue of the human body.

The nervous system, in its properties and mode of action, is distinct from
all the other systems and organs, and it shares with no other organ or
tissue the power to do its special work. It is the medium through which
all impressions are received. It connects all the parts of the body into
an organism in which each acts in harmony with every other part for the
good of the whole. It animates and governs all movements, voluntary or
involuntary,--secretion, excretion, nutrition; in fact all the processes
of organic life are subject to its regulating power. The different organs
of the body are united by a common sympathy which regulates their action:
this harmonious result is secured by means of the nervous system.

This system, in certain of its parts, receives impressions, and generates
a force peculiar to itself. We shall learn that there can be no physical
communication between or coördination of the various parts of organs, or
harmonious acts for a desire result, without the nerves. General
impressions, as in ordinary sensation, or special impressions, as in
sight, smell, taste, or hearing,--every instinct, every act of the will,
and every thought are possible only through the action of the nerve
centers.

261. Nerve Cells. However complicated the structure of nerve tissue
in man seems to be, it is found to consist of only two different elements,
nerve cells and nerve fibers. These are associated and combined
in many ways. They are arranged in distinct masses called nerve
centers, or in the form of cords known as nerves. The former are
made up of nerve fibers; the latter of both cells and fibers.

[Illustration: Fig. 110. Nerve Cells from the Spinal Cord.]

Nerve cells, which may be regarded as the central organs of the nerve
fibers, consist of masses of cell protoplasm, with a large _nucleus_ and
_nucleolus_. They bear a general resemblance to other cells, but vary much
in size and shape. Nerve cells grow, become active, and die, as do other
cells. A number of processes branch off from them, some cells giving one
or two, others many. The various kinds of nerve cells differ much in the
shape and number of processes. One of the processes is a strand which
becomes continuous with the axis cylinder of the nerve fibers; that is,
the axis cylinders of all nerve fibers are joined in one place or another
with at least one cell.

Each part of this system has its own characteristic cell. Thus we have in
the spinal cord the large, irregular cells with many processes, and in the
brain proper the three-sided cells with a process jutting out from each
corner. So characteristic are these forms of cells, that any particular
part of nerve structure may be identified by the kind of cells seen under
the microscope. Nerve cells and nerve fibers are often arranged in
groups, the various cells of the groups communicating with one another.
This clustered arrangement is called a nerve center.

262. Nerve Fibers. The nerve fibers, the essential elements of
the nerves, somewhat resemble tubes filled with a clear, jelly-like
substance. They consist of a rod, or central core, continuous throughout
the whole length of the nerve, called the axis cylinder. This core is
surrounded by the white substance of Schwann, or medullary sheath, which
gives the nerve its characteristic ivory-white appearance. The whole is
enclosed in a thin, delicate sheath, known as neurilemma.

[Illustration: Fig. 111.--Nerve Cells from the Gray Matter of the Brain.]

The axis cylinder generally passes without any break from the nerve
centers to the end of the fibers.[40] The outer sheath (neurilemma) is
also continuous throughout the length of the fibers. The medullary sheath,
on the other hand, is broken at intervals of about 1/25 of an inch, and at
the same intervals nuclei are found along the fiber, around each of
which is a minute protoplasmic mass. Between each pair of nuclei the
sheath is interrupted. This point is known as the _node of Ranvier_.

Some nerve fibers have no inner sheath (medullary), the outer alone
protecting the axis cylinder. These are known as the non-medullary fibers.
They are gray, while the ordinary medullary fibers are white in
appearance. The white nerve fibers form the white part of the brain
and of the spinal cord, and the greater part of the cerebro-spinal nerves.
The gray fibers occur chiefly in branches from the sympathetic
ganglia, though found to some extent in the nerves of the cerebro-spinal
system.

In a general way, the nerve fibers resemble an electric cable wire with
its central rod of copper, and its outer non-conducting layer of silk or
gutta percha. Like the copper rod, the axis cylinder along which the nerve
impulse travels is the essential part of a nerve fiber. In a cut nerve
this cylinder projects like the wick of a candle. It is really the
continuation of a process of a nerve cell. Thus the nerve cells and nerve
fibers are related, in that the process of one is the axis cylinder and
essential part of the other.

The separate microscopic threads or fibers, bound together in cords of
variable size, form the nerves. Each strand or cord is surrounded and
protected by its own sheath of connective tissue, made up of nerves.
According to its size a nerve may have one or many of these strands. The
whole nerve, not unlike a minute tendon in appearance, is covered by a
dense sheath of fibrous tissue, in which the blood-vessels and lymphatics
are distributed to the nerve fibers.


[Illustration: Fig. 112.--Medullated Nerve Fibers.

  A, a medullated nerve fiber, showing the subdivision of the medullary
     sheath into cylindrical sections imbricated with their ends, a nerve
     corpuscle with an oval nucleus is seen between the neurilemma and the
     medullary sheath;
  B, a medullated nerve fiber at a node or constriction of Ranvier, the
     axis cylinder passes uninterruptedly from one segment into the other,
     but the medullary sheath is interrupted.
]

263. The Functions of the Nerve Cells and Nerve Fibers. The nerve
cells are a highly active mass of living material. They find their
nourishment in the blood, which is supplied to them in abundance. The
blood not only serves as nourishment, but also supplies new material, as
it were, for the cells to work over for their own force or energy. Thus
we may think of the nerve cells as a sort of a miniature manufactory,
deriving their material from the blood, and developing from it nervous
energy.

The nerve fibers, on the other hand, are conductors of nervous energy.
They furnish a pathway along which the nerve energy generated by the cells
may travel. Made up as they are of living nerve substance, the fibers can
also generate energy, yet it is their special function to conduct
influences to and from the cells.

[Illustration: Fig. 113.--Non-Medullated Fibers.

Two nerve fibers, showing the nodes or constrictions of Ranvier and the
axis cylinder. The medullary sheath has been dissolved away. The deeply
stained oblong nuclei indicate the nerve corpuscles within the
neurilemma.]

264. The Nervous System Compared to a Telegraphic System. In men and
other highly organized animals, nerves are found in nearly every tissue
and organ of the body. They penetrate the most minute muscular fibers;
they are closely connected with the cells of the glands, and are found in
the coats of even the smallest blood-vessels. They are among the chief
factors of the structure of the sense organs, and ramify through the skin.
Thus the nervous system is the system of organs through the functions of
which we are brought into relation with the world around us. When we hear,
our ears are bringing us into relation with the outer world. So sight
opens up to us another gateway of knowledge.

It will help us the better to understand the complicated functions of the
nervous system, if we compare it to a telegraph line. The brain is the
main office, and the multitudes of nerve fibers branching off to all parts
of the body are the wires. By means of these, nerve messages are
constantly being sent to the brain to inform it of what is going on in
various parts of the body, and asking what is to be done in each case. The
brain, on receiving the intelligence, at once sends back the required
instructions. Countless messages are sent to and fro with unerring
accuracy and marvelous rapidity.

Thus, when we accidentally pick up something hot, it is instantly
dropped. A nerve impulse passes from the nerves of touch in the fingers to
the brain, which at once hurries off its order along another set of nerves
for the hand to drop the burning object. These examples, so common in
daily life, may be multiplied to any extent. Almost every voluntary act we
perform is executed under the direction of the nervous system, although
the time occupied is so small that it is beyond our power to estimate it.
The very frequency with which the nerves act tends to make us forget their
beneficent work.

265. Divisions of the Nervous System. This system in man consists of
two great divisions. The first is the great nerve center of the body, the
cerebro-spinal system, which rules the organs of animal life. This
includes the brain, the spinal cord, and the cerebro-spinal
nerves. Nerves are given off from the brain and the cord, and form the
mediums of communication between the external parts of the body, the
muscles or the sense organs, and the brain.

The second part is the sympathetic system, which regulates the
organic life. This consists of numerous small nerve centers arranged in
oval masses varying greatly in size, called ganglia or knots. These
are either scattered irregularly through the body, or arranged in a double
chain of knots lying on the front of the spine, within the chest and
abdomen. From this chain large numbers of nerves are given off, which end
chiefly in the organs of digestion, circulation, and respiration. The
sympathetic system serves to bring all portions of the animal economy into
direct sympathy with one another.

266. The Brain as a Whole. The brain is the seat of the
intellect, the will, the affections, the emotions, the memory, and
sensation. It has also many other and complex functions. In it are
established many reflex, automatic, and coordinating centers, which are as
independent of consciousness as are those of the spinal cord.

The brain is the largest and most complex mass of nerve tissue in the
body, made up of an enormous collection of gray cells and nerve fibers.
This organ consists of a vast number of distinct ganglia, or separate
masses of nerve matter, each capable of performing separate functions, but
united through the cerebral action into a harmonious whole.

[Illustration: Fig. 114.--The Upper Surface of the Cerebrum. (Showing its
division into two hemispheres, and also the convolutions)]

The average weight of the adult human brain is about 50 ounces for men and
45 ounces for women. Other things being equal, the size and weight of the
brain bear a general relation to the mental power of the individual. As a
rule, a large, healthy brain stands for a vigorous and superior intellect.
The brains of many eminent men have been found to be 8 to 12 ounces above
the average weight, but there are notable exceptions. The brains of
idiots are small; indeed, any weight under a certain size, about 30
ounces, seems to be invariably associated with an imbecile mind.

The human brain is absolutely heavier than that of any other animal,
except the whale and elephant. Comparing the size of these animals with
that of man, it is instructive to notice how much larger in proportion to
the body is man's brain. The average proportion of the weight of the brain
to the weight of the body is greater in man than in most animals, being
about 1 to 36. In some small birds, in the smaller monkeys, and in some
rodents, the proportional weight of the brain to that of the body is even
greater than in man.

267. The Cerebrum. The three principal masses which make up the brain
when viewed as a whole are:

  1. The cerebrum, or brain proper.
  2. The cerebellum, or lesser brain.
  3. The medulla oblongata.

The cerebrum comprises nearly seven-eighths of the entire mass, and
fills the upper part of the skull. It consists of two halves, the right
and left cerebral hemispheres. These are almost separated from each
other by a deep median fissure. The hemispheres are united at the bottom
of the fissure by a mass of white fibers passing from side to side. Each
of these hemispheres is subdivided into three lobes, so that the entire
cerebrum is made up of six distinct lobes.

The cerebrum has a peculiar convoluted appearance, its deep folds being
separated by fissures, some of them nearly an inch in depth.

It is composed of both white and gray matter. The former comprises the
greater part of the mass, while the latter is spread over the surface in a
layer of about ⅛ of an inch thick. The gray matter is the portion having
the highest functions, and its apparent quantity is largely increased by
being formed in convolutions.

The convolutions of the cerebrum are without doubt associated with all
those higher actions which distinguish man's life; but all the
convolutions are not of equal importance. Thus it is probable that only
the frontal part of the brain is the intellectual region, while certain
convolutions are devoted to the service of the senses.

The cerebrum is the chief seat of the sensations, the intellect, the will,
and the emotions. A study of cerebral injuries and diseases, and
experiments upon the lower animals, prove that the hemispheres, and more
especially the gray matter, are connected with mental states. The
convolutions in the human brain are more prominent than in that of the
higher animals, most nearly allied to man, although some species of
animals, not especially intelligent, have marked cerebral convolutions.
The higher races of men have more marked convolutions than those less
civilized.

A view of the under surface of the brain, which rests on the floor of the
skull, shows the origin of important nerves, called the cranial
nerves, the cerebellum, the structure connecting the optic
nerves (optic commissure), the bridge of nervous matter (pons
Varolii) connecting the two hemispheres of the cerebellum, and lastly
numerous and well-marked convolutions.

268. The Cerebellum. The cerebellum, or lesser brain, lies in
the back of the cranium, and is covered over in man by the posterior lobe
of the cerebrum. It is, at it were, astride of the back of the
cerebro-spinal axis, and consists of two hemispheres joined by a central
mass. On its under surface is a depression which receives the medulla
oblongata. The cerebellum is separated from the cerebrum by a
horizontal partition of membrane, a portion of the dura mater. In some
animals, as in the cat, this partition is partly bone.

The cerebellum is connected with other parts of the nervous system by
strands of white matter on each side, radiating from the center and
divided into numerous branches. Around these branches the gray matter is
arranged in a beautiful manner, suggesting the leaves of a tree: hence its
name, arbor vitæ, or the tree of life.

The functions of the cerebellum are not certainly known. It appears to
influence the muscles of the body so as to regulate their movements; that
is, it serves to bring the various muscular movements into harmonious
action. The mechanism by which it does this has not yet been clearly
explained. In an animal from which the cerebellum has been removed, the
functions of life do not appear to be destroyed, but all power of either
walking or flying straight is lost.

[Illustration: Fig. 115.--A Vertical Section of the Brain.

  A, frontal lobe of the cerebrum;
  B, parietal lobe;
  C, parieto occipital lobe with fissure between this lobe and
  D, the occipital lobe;
  E, cerebellum;
  F, arbor vitæ;
  H, pons Varolu;
  K, medulla oblongata;
  L, portion of lobe on the opposite side of brain.

The white curved band above H represents the corpus callosum.]

Disease or injury of the cerebellum usually produces blindness,
giddiness, a tendency to move backwards, a staggering, irregular gait, and
a feeling of insecurity in maintaining various positions. There is no loss
of consciousness, or other disturbance of the mental functions.

269. The Membranes of the Brain. The brain and spinal cord are
protected by three important membranes, known as the meninges,--the
dura mater, the arachnoid, and the pia mater.

The outer membrane, the dura mater, is much thicker and stronger than
the others, and is composed of white fibrous and elastic connective
tissue. It closely lines the inner surface of the skull, and forms a
protective covering for the brain. Folds of it pass between the several
divisions of the brain and serve to protect them.

The arachnoid is a thin membrane which lies beneath the dura mater.
It secretes a serous fluid which keeps the inner surfaces moist.

The pia mater is a very delicate, vascular membrane which covers the
convolutions, dips into all the fissures, and even penetrates into the
interior of the brain. It is crowded with blood-vessels, which divide and
subdivide very minutely before they penetrate the brain. The membranes of
the brain are sometimes the seat of inflammation, a serious and painful
disease, commonly known as brain fever.

270. The Medulla Oblongata. This is the thick upper part of the
spinal cord, lying within the cavity of the skull. It is immediately under
the cerebellum, and forms the connecting link between the brain and the
spinal cord. It is about an inch and a quarter long, and from one-half to
three-fourths of an inch wide at its upper part. The medulla
oblongata consists, like the spinal cord, of columns of white fibers
and masses of gray matter, but differently arranged. The gray matter is
broken up into masses which serve as centers of origin for various nerves.
The functions of the medulla oblongata are closely connected with the
vital processes. It is a great nerve tract for transmitting sensory and
motor impressions, and also the seat of a number of centers for reflex
actions of the highest importance to life. Through the posterior part of
the medulla the sensory impressions pass, that is, impressions from below
upwards to the brain resulting in sensation or feeling. In the anterior
part of the medulla, pass the nerves for motor transmission, that is,
nerve influences from above downwards that shall result in muscular
contractions in some part of the body.

The medulla is also the seat of a number of reflex centers connected with
the influence of the nervous system on the blood-vessels, the movements of
the heart, of respiration, and of swallowing, and on the secretion of
saliva. This spot has been called the "vital knot." In the medulla also
are centers for coughing, vomiting, swallowing, and the dilatation of the
pupil of the eye. It is also in part the deep origin of many of the
'important cranial nerves.

[Illustration: Fig. 116.--Illustrating the General Arrangement of the
Nervous System. (Posterior view.)]

271. The Cranial Nerves. The cranial or cerebral nerves
consist of twelve pairs of nerves which pass from the brain through
different openings in the base of the skull, and are distributed over the
head and face, also to some parts of the trunk and certain internal
organs. These nerves proceed in pairs from the corresponding parts of each
side of the brain, chiefly to the organs of smell, taste, hearing, and
sight.

The cranial nerves are of three kinds: sensory, motor, and both
combined, _viz_., mixed.

Distribution and Functions of the Cranial Nerves. The cranial nerves
are thus arranged in pairs:

The first pair are the olfactory nerves, which pass down through
the ethmoid bone into the nasal cavities, and are spread over the inner
surface of the nose. They are sensory, and are the special nerves of
smell.

The second pair are the optic nerves, which, under the name of
the _optic tracts_, run down to the base of the brain, from which an optic
nerve passes to each eyeball. These are sensory nerves, and are devoted to
sight.

The third, fourth, and sixth pairs proceed to the muscles of the
eyes and control their movements. These are motor nerves, the movers of
the eye.

Each of the fifth pair of nerves is in three branches, and proceeds
mainly to the face. They are called tri-facial, and are mixed nerves,
partly sensory and partly motor. The first branch is purely sensory, and
gives sensibility to the eyeball. The second gives sensibility to the
nose, gums, and cheeks. The third (mixed) gives the special sensation of
taste on the front part of the tongue, and ordinary sensation on the inner
side of the cheek, on the teeth, and also on the scalp in front of the
ear. The motor branches supply the chewing muscles.

The seventh pair, the facial, proceed to the face, where they
spread over the facial muscles and control their movements. The
eighth pair are the auditory, or nerves of hearing, and are
distributed to the special organs of hearing.

The next three pairs of nerves all arise from the medulla, and escape
from the cavity of the skull through the same foramen. They are sometimes
described as one pair, namely, the eighth, but it is more convenient to
consider them separately.

The ninth pair, the glosso-pharyngeal, are partly sensory and
partly motor. Each nerve contains two roots: one a nerve of taste, which
spreads over the back part of the tongue; the other a motor nerve, which
controls the muscles engaged in swallowing.

The tenth pair, the pneumogastric, also known as the vagus
or wandering nerves, are the longest and most complex of all the cranial
nerves. They are both motor and sensory, and are some of the most
important nerves in the body. Passing from the medulla they descend near
the œsophagus to the stomach, sending off, on their way, branches to
the throat, the larynx, the lungs, and the heart. Some of their branches
restrain the movements of the heart, others convey impressions to the
brain, which result in quickening or slowing the movements of breathing.
Other branches pass to the stomach, and convey to the brain impressions
which inform us of the condition of that organ. These are the nerves by
which we experience the feelings of pain in the stomach, hunger, nausea,
and many other vague impressions which we often associate with that organ.

[Illustration: Fig. 117.--Anterior View of the Medulla Oblongata.

  A, chiasm of the optic nerves;
  B, optic tracts;
  C, motor oculi communis;
  D, fifth nerve;
  E, motor oculi externus;
  F, facial nerve;
  H, auditory nerve;
  I, glosso-pharyngeal nerve;
  K, pneumogastric;
  L, spinal accessory;
  M, cervical nerves;
  N, upper extremity of spinal cord;
  O, decussation of the anterior pyramids;
  R, anterior pyramids of the medulla oblongata;
  S, pons Varolii.
]

The eleventh pair, the spinal accessory, are strictly motor, and
supply the muscles of the neck and the back.

The twelfth pair, the hypoglossal, are also motor, pass to the
muscles of the tongue, and help control the delicate movements in the act
of speech.

272. The Spinal Cord. This is a long, rod-like mass of white nerve
fibers, surrounding a central mass of gray matter. It is a continuation of
the medulla oblongata, and is lodged in the canal of the spinal column. It
extends from the base of the skull to the lower border of the first lumbar
vertebra, where it narrows off to a slender filament of gray substance.

The spinal cord is from 16 to 18 inches long, and has about the
thickness of one's little finger, weighing about 1-1/2 ounces. Like the
brain, it is enclosed in three membranes, which in fact are the
continuation of those within the skull. They protect the delicate cord,
and convey vessels for its nourishment. The space between the two inner
membranes contains a small quantity of fluid, supporting the cord, as it
were in a water-bath. It is thus guarded against shocks.

The cord is suspended and kept in position in the canal by delicate
ligaments at regular intervals between the inner and outer membranes.
Finally, between the canal, enclosed by its three membranes, and the bony
walls of the spinal canal, there is considerable fatty tissue, a sort of
packing material, imbedded in which are some large blood-vessels.

273. Structure of the Spinal Cord. The arrangement of the parts of
the spinal cord is best understood by a transverse section. Two fissures,
one behind, the other in front, penetrate deeply into the cord, very
nearly dividing it into lateral halves. In the middle of the isthmus which
joins the two halves, is a very minute opening, the _central canal_ of the
cord. This tiny channel, just visible to the naked eye, is connected with
one of the openings of the medulla oblongata, and extends, as do the
anterior and posterior fissures, the entire length of the cord.

The spinal cord, like the brain, consists of gray and white matter, but
the arrangement differs. In the brain the white matter is within, and the
gray matter is on the surface. In the cord the gray matter is arranged in
two half-moon-shaped masses, the backs of which are connected at the
central part. The white matter, consisting mainly of fibers, running for
the most part in the direction of the length of the cord, is outside of
and surrounds the gray crescents. Thus each half or side of the cord has
its own gray crescent, the horns of which point one forwards and the other
backwards, called respectively the anterior and posterior cornua or horns.

It will also be seen that the white substance itself, in each half of the
cord, is divided by the horns of the gray matter and by fibers passing
from them into three parts, which are known as the anterior,
posterior, and lateral columns.

  Experiment 130. Procure at the market an uninjured piece of the
  spinal cord from the loin of mutton or the sirloin or the rib of beef.
  After noting its general character while fresh, put it to soak in dilute
  alcohol, until it is sufficiently hard to be cut in sections.

274. The Spinal Nerves. From the gray matter on each side of the
spinal cord 31 spinal nerves are given off and distributed chiefly to
the muscles and the skin. They pass out at regular intervals on each side
of the canal, by small openings between the vertebræ. Having escaped from
the spine, they pass backwards and forwards, ramifying in the soft parts
of the body. The first pair pass out between the skull and the atlas, the
next between the atlas and the axis, and so on down the canal. The eighth
pair, called _cervical_, pass out in the region of the neck; twelve,
called _dorsal_, in the region of the ribs; five are _lumbar_, and five
_sacral_, while the last pair leave the cord near the coccyx.

Each spinal nerve has two roots, one from the anterior, the other
from the posterior portion of the cord. These unite and run side by
side, forming as they pass between the vertebræ one silvery thread, or
nerve trunk. Although bound up in one bundle, the nerve fibers of the two
roots remain quite distinct, and perform two entirely different functions.

After leaving the spinal cord, each nerve divides again and again into
finer and finer threads. These minute branches are distributed through the
muscles, and terminate on the surface of the body. The anterior roots
become motor nerves, their branches being distributed to certain
muscles of the body, to control their movements. The posterior roots
develop into sensory nerves, their branches being distributed through
the skin and over the surface of the body to become nerves of touch. In
brief, the spinal nerves divide and subdivide, to reach with their twigs
all parts of the body, and provide every tissue with a nerve center, a
station from which messages may be sent to the brain.

[Illustration: Fig. 118.--Side View of the Spinal Cord. (Showing the
fissures and columns.)

  A, anterior median fissure;
  B, posterior median fissure;
  C, anterior lateral fissure;
  D, posterior lateral fissure;
  E, lateral column;
  F, anterior column;
  G, posterior column;
  H, posterior median column;
  K, anterior root;
  L, posterior root;
  M, ganglion of
  N, a spinal nerve.
]

275. The Functions of the Spinal Nerves. The messages which pass
along the spinal nerves to and from the brain are transmitted mostly
through the gray matter of the cord, but some pass along the white matter
on the outer part. As in the brain, however, all the active powers of the
cord are confined to the gray matter. The spinal nerves themselves have
nothing to do with sensation or will. They are merely conductors to carry
messages to and fro. They neither issue commands nor feel a sensation.
Hence, they consist entirely of white matter.

276. Functions of the Spinal Cord. The spinal cord is the principal
channel through which all impulses from the trunk and extremities pass to
the brain, and all impulses to the trunk and extremities pass from the
brain. That is, the spinal cord receives from various parts of the body
by means of its sensory nerves certain impressions, and conveys them to
the brain, where they are interpreted.

The cord also transmits by means of its motor nerves the commands of the
brain to the voluntary muscles, and so causes movement. Thus, when the
cord is divided at any point, compressed, as by a tumor or broken bone, or
disorganized by disease, the result is a complete loss of sensation and
voluntary movement below the point of injury. If by accident a man has his
spinal cord injured at some point, he finds he has lost all sensation and
power of motion below that spot. The impulse to movement started in his
brain by the will does not reach the muscles he wishes to move, because
traveling _down_ the spinal cord, it cannot pass the seat of injury.

So the impression produced by pricking the leg with a pin, which, before
pain can be felt, must travel up the spinal cord to the brain, cannot
reach the brain because the injury obstructs the path. The telegraph wire
has been cut, and the current can no longer pass.

277. The Spinal Cord as a Conductor of Impulses. The identity in
structure of the spinal nerves, whether motor or sensory, and the vast
number of nerves in the cord make it impossible to trace for any distance
with the eye, even aided by the microscope and the most skillful
dissection, the course of nerve fibers. The paths by which the motor
impulses travel down the cord are fairly well known. These impulses
originate in the brain, and passing down keep to the same side of the
cord, and go out by nerves to the same side of the body.

The sensory impulses, however, soon after they enter the cord by the
nerve of one side, cross in the cord to the opposite side, up which they
travel to the brain. Thus the destruction of one lateral half of the cord
causes paralysis of motion on the _same side_ as the injury, but loss of
sensation on the _opposite side_, because the posterior portion destroyed
consists of fibers which have crossed from the opposite side.

Experiment proves that if both roots of a spinal nerve be cut, all those
parts of the body to which they send branches become paralyzed, and have
neither sense of pain nor power of voluntary movement. The parts might
even be cut or burned without pain. It is precisely like cutting a
telegraph wire and stopping the current.

[Illustration: Fig. 119.--The Base of the Brain.

  A, anterior lobe of the cerebrum;
  B, olfactory nerve;
  C, sphenoid portion of the posterior lobe;
  D, optic chiasm;
  E, optic tract;
  F, abducens;
  H, M, hemispheres of the cerebellum;
  K, occipital portion of the occipital lobe;
  L, fissure separating the hemispheres;
  N, medulla oblongata;
  O, olivary body;
  P, antenor pyramids;
  R, pons Valoru;
  S, section of olfactory nerve, with the trunk removed to show sulcus in
     which it is lodged;
  T, anterior extremity of median fissure
]

Experiment also proves that if only the posterior root of a spinal nerve
be cut, all sensation is lost in the parts to which the nerve passes, but
the power of moving these parts is retained. But if the anterior root
alone be divided, all power of motion in the parts supplied by that nerve
is lost, but sensation remains. From these and many other experiments, it
is evident that those fibers of a nerve which are derived from the
anterior root are motor, and those from the posterior root sensory,
fibers. Impulses sent _from_ the brain and spinal cord to muscles will,
therefore, pass along the anterior roots through those fibers of the
nerves which are derived from these (motor) roots. On the other hand,
impressions or sensations passing _to_ the brain will enter the spinal
cord and reach the brain through the posterior or sensory roots.

278. The Spinal Cord as a Reflex Center. Besides this function of the
spinal cord as a great nerve conductor to carry sensations to the brain,
and bring back its orders, it is also an independent center for what
is called reflex action. By means of its sensory nerves it receives
impressions from certain parts of the body, and on its own authority sends
back instructions to the muscles by its motor nerves, without consulting
the brain. This constitutes reflex action, so called because the
impulse sent to the spinal cord by certain sensory nerves is at once
reflected or sent back as a motor impulse to the muscles.

This reflex action is a most important function of the spinal cord. This
power is possessed only by the gray matter of the cord, the white
substance being simply a conductor.

The cells of gray matter are found all along the cord, but are grouped
together in certain parts, notably in the cervical and lumbar regions. The
cells of the anterior horns are in relation with the muscles by means of
nerve fibers, and are also brought into connection with the skin and other
sensory surfaces, by means of nerve fibers running in the posterior part
of the cord. Thus there is established in the spinal cord, without
reference to the brain at all, a reflex mechanism.

279. Reflex Centers. For the purpose of illustration, we might
consider the body as made up of so many segments piled one on another,
each segment presided over by a similar segment of spinal cord. Each
bodily segment would have sensory and motor nerves corresponding to its
connection with the spinal cord. The group of cells in each spinal segment
is intimately connected with the cells of the segments above and below.
Thus an impression reaching the cells of one spinal segment might be so
strong as to overflow into the cells of other segments, and thus cause
other parts of the body to be affected.

Take as an example the case of a child who has eaten improper food, which
irritates its bowels. Sensory nerves of the bowels are disturbed, and
powerful impressions are carried up to a center in the spinal cord. These
impressions may now overflow into other centers, from which spasmodic
discharges of nerve energy may be liberated, which passing to the muscles,
throw them into violent and spasmodic contraction. In other words, the
child has a fit, or convulsion. All this disturbance being the result of
reflex action (the spasmodic motions being quite involuntary, as the brain
takes no part in them), the child meanwhile is, of course, entirely
unconscious and, however it may seem to be distressed, really suffers no
pain.

Scattered along the entire length of the spinal cord, especially in the
upper part, are groups of nerve cells which preside over certain specific
functions of animal life; that is, definite collections of cells which
control definite functions. Thus there are certain centers for maintaining
the action of the heart, and the movements of breathing; and low down in
the cord, in the lumbar regions, are centers for the control of the
various abdominal organs.

Numerous other reflex centers are described by physiologists, but enough
has been said to emphasize the great importance of the spinal cord as an
independent nerve center, besides its function as a conductor of
nervous impulses to and from the brain.

280. The Brain as a Reflex Center. The brain, as we have just
stated, is the seat of consciousness and intelligence. It is also the seat
of many reflex, automatic, and coordinating centers. These give rise to
certain reflex actions which are as entirely independent of consciousness
as are those of the spinal cord. These acts take place independently of
the will, and often without the consciousness of the individual. Thus, a
sudden flash of light causes the eyes to blink, as the result of reflex
action. The optic nerves serve as the sensory, and the facial nerves as
the motor, conductors. The sudden start of the whole body at some loud
noise, the instinctive dodging a threatened blow, and the springing back
from sudden danger, are the results of reflex action. The result ensues in
these and in many other instances, without the consciousness of the
individual, and indeed beyond his power of control.

281. The Importance of Reflex Action. Reflex action is thus a
marvelous provision of nature for our comfort, health, and safety. Its
vast influence is not realized, as its numberless acts are so continually
going on without our knowledge. In fact, the greater part of nerve power
is expended to produce reflex action. The brain is thus relieved of a vast
amount of work. It would be impossible for the brain to serve as a
"thinking center" to control every act of our daily life. If we had to
plan and to will every heart-beat or every respiration, the struggle for
life would soon be given up.

The fact that the gray cells of the spinal cord can originate a countless
number of reflex and automatic activities is not only of great importance
in protecting the body from injury, but increases vastly the range of the
activities of our daily life.

Even walking, riding the bicycle, playing on a piano, and numberless other
such acts may be reflex movements. To learn how, requires, of course, the
action of the brain, but with frequent repetition the muscles become so
accustomed to certain successive movements, that they are continued by
the cord without the control of the brain. Thus we may acquire a sort of
artificial reflex action, which in time becomes in a way a part of our
organization, and is carried on without will power or even consciousness.

So, while the hands are busily doing one thing, the brain can be intently
thinking of another. In fact, any attempt to control reflex action is more
apt to hinder than to help. In coming rapidly down stairs, the descent
will be made with ease and safety if the spinal cord is allowed entire
charge of the act, but the chances of stumbling or of tripping are very
much increased if each step be taken as the result of the will power. The
reflex action of the cord may be diminished, or inhibited as it is called,
but this power is limited. Thus, we can by an effort of the will stop
breathing for a certain time, but beyond that the reflex mechanism
overcomes our will and we could not, if we would, commit suicide by
holding our breath. When we are asleep, if the palm of the hand be
tickled, it closes; when we are awake we can prevent it.

[Illustration: Fig. 120.--Dr. Waller's Diagrammatic Illustration of the
Reflex Process.

From the sentient surface (1) an afferent impulse passes along (2) to the
posterior root of the spinal cord, the nerve fibers of the posterior root
ending in minute filaments among the small cells of this part of the cord
(3). In some unknown way this impulse passes across the gray part of the
cord to the large cells of the anterior root (5), the cells of this part
being connected by their axis-cylinder with the efferent fibers (6). These
convey the stimulus to the fibers of the muscle (7), which accordingly
contract. Where the brain is concerned in the action the circuit is longer
through S and M.]

  Experiment 131. _To illustrate reflex action by what is called
  knee-jerk._ Sit on a chair, and cross the right leg over the left one.
  With the tips of the fingers or the back of a book, strike the right
  ligamentum patellæ. The right leg will be raised and thrown forward with
  a jerk, owing to the contraction of the quadriceps muscles. An
  appreciable time elapses between the striking of the tendon and the
  jerk. The presence or absence of the knee-jerk may be a most significant
  symptom to the physician.

282. The Sympathetic System. Running along each side of the spine,
from the base of the skull to the coccyx, is a chain of nerve knots, or
ganglia. These ganglia, twenty-four on each side, and their branches
form the sympathetic system, as distinguished from the cerebro-spinal
system consisting of the brain and spinal cord and the nerves springing
from them. The ganglia of the sympathetic system are connected with each
other and with the sensory roots of the spinal nerves by a network of gray
nerve fibers.

At the upper end the chain of each side passes up into the cranium and is
closely connected with the cranial nerves. In the neck, branches pass to
the lungs and the heart. From the ganglia in the chest three nerves form a
complicated network of fibers, from which branches pass to the stomach,
the liver, the intestines, the kidneys, and other abdominal organs. A
similar network of fibers is situated lower down in the pelvis, from which
branches are distributed to the pelvic organs. At the coccyx the two
chains unite into a single ganglion.

Thus, in general, the sympathetic system, while intimately connected with
the cerebro-spinal, forms a close network of nerves which specially
accompany the minute blood-vessels, and are distributed to the muscles of
the heart, the lungs, the stomach, the liver, the intestines, and the
kidneys--that is, the hollow organs of the body.

283. The Functions of the Sympathetic System. This system exercises a
superintending influence over the greater part of the internal organs of
the body, controlling to a certain extent the functions of digestion,
nutrition, circulation, and respiration. The influence thus
especially connected with the processes of organic life is generally
different from, or even opposed to, that conveyed to the same organs by
fibers running in the spinal or cranial nerves. These impulses are beyond
the control of the will.

[Illustration: Fig. 121.--The Cervical and Thoracic Portion of the
Sympathetic Nerve and its Main Branches.

  A, right pneumogastric;
  B, spinal accessory;
  C, glosso-pharyngeal;
  D, right bronchus;
  E, right branch of pulmonary artery;
  F, one of the intercostal nerves;
  H, great splanchnic nerve;
  K, solar plexus;
  L, left pneumogastric;
  M, stomach branches of right pneumogastric;
  N, right ventricle;
  O, right auricle;
  P, trunk of pulmonary artery;
  R, aorta; S, cardiac nerves;
  T, recurrent laryngeal nerve;
  U, superior laryngeal nerve;
  V, submaxillary ganglion;
  W, lingual branch of the 5th nerve;
  X, ophthalmic ganglion;
  Y, motor oculi externus.
]

Hence, all these actions of the internal organs just mentioned that are
necessary to the maintenance of the animal life, and of the harmony which
must exist between them, are controlled by the sympathetic system. But for
this control, the heart would stop beating during sleep, digestion would
cease, and breathing would be suspended. Gentle irritation of these
nerves, induced by contact of food in the stomach, causes that organ to
begin the churning motion needed for digestion. Various mental emotions
also have a reflex action upon the sympathetic system. Thus, terror
dilates the pupils, fear acts upon the nerves of the small blood-vessels
of the face to produce pallor, and the sight of an accident, or even the
emotions produced by hearing of one, may excite nausea and vomiting.

The control of the blood-vessels, as has been stated (sec. 195), is
one of the special functions of the sympathetic system. Through the nerves
distributed to the muscular coats of the arteries, the caliber of these
vessels can be varied, so that at one moment they permit a large quantity
of blood to pass, and at another will contract so as to diminish the
supply. This, too, is beyond the control of the will, and is brought about
by the vaso-motor nerves of the sympathetic system through a reflex
arrangement, the center for which is the medulla oblongata.

284. Need of Rest. The life of the body, as has been emphasized in
the preceding chapters, is subject to constant waste going on every
moment, from the first breath of infancy to the last hour of old age. We
should speedily exhaust our life from this continual loss, but for its
constant renewal with fresh material. This exhaustion of life is increased
by exertion, and the process of repair is vastly promoted by rest. Thus,
while exercise is a duty, rest is equally imperative.

The eye, when exactingly used in fine work, should have frequent intervals
of rest in a few moments of darkness by closing the lids. The brain, when
urged by strenuous study, should have occasional seasons of rest by a
dash of cold water upon the forehead, and a brief walk with slow and deep
inspirations of fresh air. The muscles, long cramped in a painful
attitude, should be rested as often as may be, by change of posture or by
a few steps around the room.

It is not entirely the amount of work done, but the continuity of
strain that wears upon the body. Even a brief rest interrupts this
strain; it unclogs the wheels of action. Our bodies are not designed for
continuous toil. An alternation of labor and rest diminishes the waste of
life. The benign process of repair cannot go on, to any extent, during
strenuous labor, but by interposing frequent though brief periods of rest,
we lessen the amount of exhaustion, refresh the jaded nerves, and the
remaining labor is more easily endured.

285. Benefits of Rest. There is too little repose in our American
nature and in our modes of life. A sense of fatigue is the mute appeal of
the body for a brief respite from labor, and the appeal should, if
possible, be heeded. If this appeal be not met, the future exertion
exhausts far more than if the body had been even slightly refreshed. If
the appeal be met, the brief mid-labor rest eases the friction of toil,
and the remaining labor is more easily borne. The feeling that a
five-minute rest is so much time lost is quite an error. It is a gain of
physical strength, of mental vigor, and of the total amount of work done.

The merchant burdened with the cares of business life, the soldier on the
long march, the ambitious student over-anxious to win success in his
studies, the housewife wearied with her many hours of exacting toil, each
would make the task lighter, and would get through it with less loss of
vital force, by occasionally devoting a few minutes to absolute rest in
entire relaxation of the strained muscles and overtaxed nerves.

286. The Sabbath as a Day of Physiological Rest. The divine
institution of a Sabbath of rest, one day in seven, is based upon the
highest needs of our nature. Rest, to be most effective, should alternate
in brief periods with labor.

It is sound physiology, as well as good morals and manners, to cease
from the usual routine of six days of mental or physical work, and rest
both the mind and the body on the seventh. Those who have succeeded best
in what they have undertaken, and who have enjoyed sound health during a
long and useful life, have studiously lived up to the mandates of this
great physiological law. It is by no means certain that the tendency
nowadays to devote the Sabbath to long trips on the bicycle, tiresome
excursions by land and sea, and sight-seeing generally, affords that real
rest from a physiological point of view which nature demands after six
days of well-directed manual or mental labor.

287. The Significance of Sleep as a Periodical Rest. Of the chief
characteristics of all living beings none is so significant as their
periodicity. Plants as well as animals exhibit this periodic
character. Thus plants have their annual as well as daily periods of
activity and inactivity. Hibernating animals pass the winter in a
condition of unconsciousness only to have their functions of activity
restored in early spring. Human beings also present many instances of a
periodic character, many of which have been mentioned in the preceding
pages. Thus we have learned that the heart has its regular alternating
periods of work and rest. After every expiration from the lungs there is a
pause before the next inspiration begins.

Now sleep is just another manifestation of this periodic and
physiological rest by which Nature refreshes us. It is during the periods
of sleep that the energy expended in the activities of the waking hours is
mainly renewed. In our waking moments the mind is kept incessantly active
by the demands made on it through the senses. There is a never-ceasing
expenditure of energy and a consequent waste which must be repaired. A
time soon comes when the brain cells fail to respond to the demand, and
sleep must supervene. However resolutely we may resist this demand,
Nature, in her relentless way, puts us to sleep, no matter what objects
are brought before the mind with a view to retain its attention.[41]

288. Effect of Sleep upon the Bodily Functions. In all the higher
animals, the central nervous system enters once at least in the
twenty-four hours into the condition of rest which we call sleep.
Inasmuch as the most important modifications of this function are observed
in connection with the cerebro-spinal system, a brief consideration of the
subject is properly studied in this chapter. In Chapter IV. we learned
that repose was as necessary as exercise to maintain muscular vigor. So
after prolonged mental exertion, or in fact any effort which involves an
expenditure of what is often called nerve-force, sleep becomes a
necessity. The need of such a rest is self-evident, and the loss of it is
a common cause of the impairment of health. While we are awake and active,
the waste of the body exceeds the repair; but when asleep, the waste is
diminished, and the cells are more actively rebuilding the structure for
to-morrow's labor. The organic functions, such as are under the direct
control of the sympathetic nervous system,--circulation, respiration, and
digestion,--are diminished in activity during sleep. The pulsations of the
heart and the respiratory movements are less frequent, and the
circulation is slower. The bodily temperature is reduced, and the cerebral
circulation is diminished. The eyes are turned upward and inward, and the
pupils are contracted.

The senses do not all fall to sleep at once, but drop off successively:
first the sight, then the smell, the taste, the hearing and lastly the
touch. The sleep ended, they awake in an inverse order, touch, hearing,
taste, smell, and sight.

289. The Amount of Sleep Required. No precise rule can be laid down
concerning the amount of sleep required. It varies with age, occupation,
temperament, and climate to a certain extent. An infant whose main
business it is to grow spends the greater part of its time in sound sleep.
Adults of average age who work hard with their hands or brain, under
perfectly normal physiological conditions, usually require at least eight
hours of sleep. Some need less, but few require more. Personal
peculiarities, and perhaps habit to a great extent, exert a marked
influence. Some of the greatest men, as Napoleon I., have been very
sparing sleepers. Throughout his long and active life, Frederick the Great
never slept more than five or six hours in the twenty-four. On the other
hand, some of the busiest brain-workers who lived to old age, as William
Cullen Bryant and Henry Ward Beecher, required and took care to secure at
least eight or nine hours of sound sleep every night.

In old age, less sleep is usually required than in adult life, while the
aged may pass much of their time in sleep. In fact, each person learns by
experience how much sleep is necessary. There is no one thing which more
unfits one for prolonged mental or physical effort than the loss of
natural rest.

290. Practical Rules about Sleep. Children should not be played with
boisterously just before the bedtime hour, nor their minds excited with
weird goblin stories, or a long time may pass before the wide-open eyes
and agitated nerves become composed to slumber. Disturbed or insufficient
sleep is a potent factor towards producing a fretful, irritable child.

At all ages the last hour before sleep should, if possible, be spent
quietly, to smooth the way towards sound and refreshing rest. The sleep
induced by medicine is very often troubled and unsatisfactory. Medicines
of this sort should not be taken except on the advice of a physician.

While a hearty meal should not usually be taken just before bedtime, it is
not well to go to bed with a sense of positive faintness and hunger.
Rather, one should take a very light lunch of quite simple food as a
support for the next eight hours.

[Illustration: Fig. 122.--Trunk of the Left Pneumogastric.

(Showing its distribution by its branches and ganglia to the larynx,
pharynx, heart, lungs, and other parts.)]

It is better, as a rule, not to engage in severe study during the hours
just before bedtime. Neither body nor mind being at its best after the
fatigues of the day, study at that time wears upon the system more, and
the progress is less than at earlier hours. One hour of morning or day
study is worth a much longer time late at night. It is, therefore, an
economy both of time and of nerve force to use the day hours and the early
evening for study.

The so-called "cat naps" should never be made to serve as a substitute for
a full night's sleep. They are largely a matter of habit, and are
detrimental to some as well as beneficial to others. Late hours are
usually associated with exposure, excitement, and various other drains
upon the nerve force, and hence are injurious.

It is better to sleep on one or other side than on the back. The head
should be somewhat raised, and a mattress is better than a feather bed.
The bedclothes should be sufficient, but not too heavy. Light tends to
prevent sleep, as do loud or abrupt sounds, but monotonous sounds aid it.

291. Alcohol and the Brain. The unfortunate effects which alcoholic
drinks produce upon the brain and nervous system differ from the
destructive results upon other parts of the body in this respect, that
elsewhere the consequences are usually both less speedy and less obvious.
The stomach, the liver, and even the heart may endure for a while the
trespass of the narcotic poison, and not betray the invasion. But the
nervous system cannot, like them, suffer in silence.

In the other parts of the body the victim may (to a certain extent)
conceal from others the suffering of which he himself is painfully
conscious. But the tortured brain instantly reveals the calamity and the
shame, while the only one who may not fully realize it is the victim
himself. Besides this, the injuries inflicted upon other organs affect
only the body, but here they drag down the mind, ruin the morals, and
destroy the character.

The brain is indeed the most important organ of the body, as it presides
over all the others. It is the lofty seat of power and authority. Here the
king is on his throne. But if, by this malignant adversary, the king
himself be dethroned, his whole empire falls to ruins.

292. How Alcohol Injures the Brain. The brain, the nerve centers,
and the nerves are all made up of nerve pulp, the softest and most
delicate tissue in the whole bodily structure. Wherever this fragile
material occurs in our bodies,--in the skull, the spine, the trunk, or the
limbs,--the all-wise Architect has carefully protected it from violence,
for a rough touch would injure it, or even tender pressure would disturb
its function.

It is a further indication of the supreme importance of the brain, that
about one-fifth of the entire blood of the body is furnished to it.
Manifestly, then, this vital organ must be tenderly cared for. It must
indeed be well nourished, and therefore the blood sent to it must be
highly nutrient, capable of supplying oxygen freely. This condition is
essential to successful brain action. But intoxicants bring to it blood
surcharged with a poisonous liquid, and bearing only a limited supply of
oxygen.

Another condition of a healthy brain is that the supply of blood to it
shall be equable and uniform. But under the influence of strong drink, the
blood pours into the paralyzed arteries a surging tide that floods the
head, and hinders and may destroy the use of the brain and the senses.
Still another requirement is that whatever is introduced into the cerebral
tissues, having first passed through the stomach walls and thence into the
blood, shall be bland, not irritating. But in the brain of the inebriate
are found not only the distinct odor but the actual presence of alcohol.
Thus we plainly see how all these three vital conditions of a healthy
brain are grossly violated by the use of intoxicants.

  "I think there is a great deal of injury being done by the use of
  alcohol in what is supposed by the consumer to be a most moderate
  quantity, to persons who are not in the least intemperate, and to people
  supposed to be fairly well. It leads to degeneration of the tissues; it
  damages the health; it injures the intellect. Short of drunkenness, that
  is, in those effects of it which stop short of drunkenness, I should say
  from my experience that alcohol is the most destructive agent we are
  aware of in this country."--Sir William Gull, the most eminent English
  physician of our time.

293. Why the Brain Suffers from the Alcoholic Habit. We do not find
that the alcoholic habit has produced in the brain the same coarse
injuries that we see in other organs, as in the stomach, the liver, or the
heart. Nor should we expect to find them; for so delicate and so sensitive
is the structure of this organ, that a very slight injury here goes a
great way,--a disturbance may be overwhelming to the brain that would be
only a trifle to some of the less delicate organs.

Alcohol has different degrees of affinity for different organs of the
body, but much the strongest for the cerebral tissues. Therefore the brain
feels more keenly the presence of alcohol than does any other organ.
Almost the moment that the poison is brought into the stomach, the nerves
send up the alarm that an invading foe has come. At once there follows a
shock to the brain, and very soon its paralyzed blood-vessels are
distended with the rush of blood. This first effect is, in a certain
sense, exhilarating, and from this arousing influence alcohol has been
erroneously considered a stimulant; but the falsity of this view is
pointed out elsewhere in this book.

294. Alcohol, the Enemy of Brain Work. The healthy brain contains a
larger proportion of water than does any other organ. Now alcohol, with
its intense affinity for water, absorbs it from the brain, and thus
condenses and hardens its structure. One of the important elements of the
brain is its albumen; this also is contracted by alcohol. The nerve cells
and fibers gradually become shriveled and their activity is lowered, the
elasticity of the arteries is diminished, the membranes enveloping the
brain are thickened, and thus all proper brain nutrition is impaired. The
entire organ is slowly hardened, and becomes unfitted for the proper
performance of its delicate duties. In brief, alcohol in any and every
form is the enemy of successful and long-continued brain work.

[Illustration: Fig. 123.--Nerve Trunks of the Right Arm.]

295. Other Physical Results of Intoxicants. What are some of the
physical results observed? First, we note the failure of the vaso-motor
nerves to maintain the proper tone of the blood-vessels, as in the turgid
face and the congested cornea of the eye. Again, we observe the loss of
muscular control, as is shown by the drop of the lower lip, the thickened
speech, and the wandering eye. The spinal cord, too, is often affected and
becomes unable to respond to the demand for reflex action, as appears from
the trembling hands, the staggering legs, the swaying body, and the
general muscular uncertainty. All these are varied results of the
temporary paralysis of the great nerve centers.

Besides, the sensibility of the nerves is deadened. The inebriate may
seize a hot iron and hardly know it, or wound his hand painfully and never
feel the injury. The numbness is not of the skin, but of the brain, for
the drunken man may be frozen or burned to death without pain. The senses,
too, are invaded and dulled. Double vision is produced, the eyes not being
so controlled as to bring the image upon corresponding points of the
retina.

296. Diseases Produced by Alcohol. The diseases that follow in the
train of the alcoholic habit are numerous and fatal. It lays its
paralyzing hand upon the brain itself, and soon permanently destroys the
integrity of its functions. In some the paralysis is local only, perhaps
in one of the limbs, or on one side of the body; in others there is a
general muscular failure. The vitality of the nerve centers is so
thoroughly impaired that general paralysis often ensues. A condition of
insomnia, or sleeplessness, often follows, or when sleep does come, it is
in fragments, and is far from refreshing to the jaded body.

In time follows another and a terrible disease known as _delirium
tremens_; and this may occur in those who claim to be only moderate
drinkers, rarely if ever intoxicated. It accompanies an utter breakdown of
the nervous system. Here reason is for the time dethroned, while at some
times wild and frantic, or at others a low, mumbling delirium occurs, with
a marked trembling from terror and exhaustion.

There is still another depth of ruin in this downward course, and that is
_insanity_. In fact, every instance of complete intoxication is a case of
temporary insanity, that is, of mental unsoundness with loss of
self-control. Permanent insanity may be one of the last results of
intemperance. Alcoholism sends to our insane asylums a large proportion of
their inmates, as ample records testify.

297. Mental and Moral Ruin Caused by Alcoholism. Alcoholism, the evil
prince of destroyers, also hastens to lay waste man's mental and moral
nature. Just as the inebriate's senses, sight, hearing, and touch, fail to
report correctly of the outer world, so the mind fails to preside properly
over the inner realm. Mental perceptions are dulled. The stupefied
faculties can hardly be aroused by any appeal. Memory fails. Thus the man
is disqualified for any responsible labor. No railroad company, no
mercantile house, will employ any one addicted to drinking. The mind of
the drunkard is unable to retain a single chain of thought, but gropes
about with idle questionings. The intellect is debased. Judgment is
impossible, for the unstable mind cannot think, compare, or decide.

The once active power of the will is prostrate, and the victim can no
longer resist the feeblest impulse of temptation. The grand faculty of
self-control is lost; and as a result, the baser instincts of our lower
nature are now uppermost; greed and appetite rule unrestrained.

But the moral power is also dragged down to the lowest depths. All the
finer sensibilities of character are deadened; all pride of personal
appearance, all nice self-respect and proper regard for the good opinion
of others, every sense of decorum, and at last every pretence of decency.
Dignity of behavior yields to clownish silliness, and the person lately
respected is now an object of pity and loathing. The great central
convictions of right and wrong now find no place in his nature; conscience
is quenched, dishonesty prevails. This is true both as to the solemn
promises, which prove mere idle tales, and also as to property, for he
resorts to any form of fraud or theft to feed the consuming craving for
more drink.

298. Evil Results of Alcoholism Inherited. But the calamity does not
end with the offender. It may follow down the family line, and fasten
itself upon the unoffending children. These often inherit the craving for
drink, with the enfeebled nature that cannot resist the craving, and so
are almost inevitably doomed to follow the appalling career of their
parents before them.

Nor does this cruel taint stop with the children. Even their descendants
are often prone to become perverse. As one example, careful statistics of
a large number of families, more than two hundred descended from
drunkards, show that a very large portion of them gave undoubted proof of
well-marked degeneration. This was plain in the unusual prevalence of
infant mortality, convulsions, epilepsy, hysteria, fatal brain diseases,
and actual imbecility.[42]

It is found that the long-continued habitual user of alcoholic drinks, the
man who is never intoxicated, but who will tell you that he has drunk
whiskey all his life without being harmed by it, is more likely to
transmit the evil effects to his children than the man who has occasional
drunken outbreaks with intervals of perfect sobriety between. By his
frequently repeated small drams he keeps his tissues constantly
"alcoholized" to such an extent that they are seldom free from some of the
more or less serious consequences. His children are born with organisms
which have received a certain bias from which they cannot escape; they are
freighted with some heredity, or predisposition to particular forms of
degeneration, to some morbid tendency, to an enfeebled constitution, to
various defective conditions of mind and body. Let the children of such a
man attempt to imitate the drinking habits of the father and they quickly
show the effects. Moderate drinking brings them down.

Among other consequences of an alcoholic inheritance which have been
traced by careful observers are: Morbid changes in the nerve centers,
consisting of inflammatory lesions, which vary according to the age in
which they occur; alcoholic insanity; congenital malformations; and a much
higher infant death rate, owing to lack of vitality, than among the
children of normal parents.

Where the alcoholic inheritance does not manifest itself in some definite
disease or disorder, it can still be traced in the limitations to be found
in the drinking man's descendants. They seem to reach a level from which
they cannot ascend, and where from slight causes they deteriorate. The
parents, by alcoholic poisoning, have lowered the race stock of vitality
beyond the power of ascent or possibility to rise above or overcome the
downward tendency.

Of course these effects of alcoholics differ widely according to the
degree of intoxication. Yet, we must not forget that the real nature of
inebriety is always the same. The end differs from the beginning only in
degree. He who would avoid a life of sorrow, disgrace, and shame must
carefully shun the very first glass of intoxicants.

299. Opium. Opium is a gum-like substance, the dried juice of the
unripe capsule of the poppy. The head of the plant is slit with fine
incisions, and the exuding white juice is collected. When it thickens and
is moulded in mass, it becomes dark with exposure. _Morphine_, a white
powder, is a very condensed form of opiate; _laudanum_, an alcoholic
solution of marked strength; and _paregoric_, a diluted and flavored form
of alcoholic tincture.

300. Poisonous Effects of Opium. Some persons are drawn into the use
of opium, solely for its narcotic and intoxicating influence.
Every early consent to its use involves a lurking pledge to repeat the
poison, till soon strong cords of the intoxicant appetite bind the now
yielding victim.

Opium thus used lays its benumbing hand upon the brain, the mind is
befogged, thought and reasoning are impossible. The secretions of the
stomach are suspended, digestion is notably impaired, and the gastric
nerves are so deadened that the body is rendered unconscious of its needs.

The moral sense is extinguished, persons once honest resort to fraud and
theft, if need be, to obtain the drug, till at last health, character, and
life itself all become a pitiful wreck.

301. The Use of Opium in Patent Medicines. Some forms of this drug
are found in nearly all the various patent medicines so freely sold as a
cure-all for every mortal disease. Opiates are an ingredient in different
forms and proportions in almost all the soothing-syrups, cough medicines,
cholera mixtures, pain cures, and consumption remedies, so widely and
unwisely used. Many deaths occur from the use of these opiates, which at
first seem indeed to bring relief, but really only smother the prominent
symptoms, while the disease goes on unchecked, and at last proves fatal.

These patent medicines may appear to help one person and be fraught with
danger to the next, so widely different are the effects of opiates upon
different ages and temperaments. But it is upon children that these fatal
results oftenest fall. Beyond doubt, thousands of children have been
soothed and soothed out of existence.[43]

302. The Victim of the Opium Habit. Occasionally persons convalescing
from serious sickness where anodynes were taken, unwisely cling to them
long after recovery. Other persons, jaded with business or with worry, and
unable to sleep, unwisely resort to some narcotic mixture to procure rest.
In these and other similar cases, the use of opiates is always most
pernicious. The amount must be steadily increased to obtain the elusive
repose, and at best the phantom too often escapes.

Even if the desired sleep is procured, it is hardly the coveted rest, but
a troubled and dreamy slumber, leaving in the morning the body quite
unrefreshed, the head aching, the mouth dry, and the stomach utterly
devoid of appetite. But far worse than even this condition is the slavish
yielding to the habit, which soon becomes a bondage in which life is shorn
of its wholesome pleasures, and existence becomes a burden.


303. Chloral. There are other preparations which have become
instruments of direful and often fatal injury. Chloral is a powerful
drug that has been much resorted to by unthinking persons to produce
sleep. Others, yielding to a morbid reluctance to face the problems of
life, have timidly sought shelter in artificial forgetfulness. To all such
it is a false friend. Its promises are treason. It degrades the mind,
tramples upon the morals, overpowers the will, and destroys life itself.


304. Cocaine, Ether, Chloroform, and Other Powerful Drugs. Another
dangerous drug is Cocaine. Ether and chloroform, those priceless
blessings to the human race if properly controlled, become instruments of
death when carelessly trifled with. Persons who have been accustomed to
inhale the vapor in slight whiffs for neuralgia or similar troubles do so
at imminent hazard, especially if lying down. They are liable to become
slowly unconscious, and so to continue the inhalation till life is ended.

There is still another class of drugs often carelessly used, whose effect,
while less directly serious than those mentioned, is yet far from
harmless. These drugs, which have sprung into popular use since the
disease _la grippe_ began its dreaded career, include _phenacetine_,
_antipyrine_, _antifebrine_, and other similar preparations. These drugs
have been seized by the public and taken freely and carelessly for all
sorts and conditions of trouble. The random arrow may yet do serious harm.
These drugs, products of coal-oil distillation, are powerful depressants.
They lower the action of the heart and the tone of the nervous centers.
Thus the effect of their continued use is to so diminish the vigor of the
system as to aggravate the very disorder they are taken to relieve.


305. Effect of Tobacco on the Nervous System. That the use of tobacco
produces a pernicious effect upon the nervous system is obvious from the
indignant protest of the entire body against it when it is first used. Its
poisonous character is amply shown by the distressing prostration and
pallor, the dizziness and faintness, with extreme nausea and vomiting,
which follow its employment by a novice.

The morbid effects of tobacco upon the nervous system of those who
habitually use it are shown in the irregular and enfeebled action of the
heart, with dizziness and muscular tremor. The character of the pulse
shows plainly the unsteady heart action, caused by partial paralysis of
the nerves controlling this organ. Old, habitual smokers often show an
irritable and nervous condition, with sleeplessness, due doubtless to lack
of proper brain nutrition.

All these results tend to prove that tobacco is really a nerve poison, and
there is reason to suspect that the nervous breakdown of many men in
mature life is often due to the continued use of this depressing agent.
This is shown more especially in men of sedentary life and habits, as men
of active habits and out-door life, experience less of the ill effects of
tobacco.

Few, if any, habitual users of tobacco ever themselves approve of it. They
all regret the habit, and many lament they are so enslaved to it that they
cannot throw it off. They very rarely advise any one to follow their
example.

306. Effects of Tobacco on the Mind. With this continuously
depressing effect of tobacco upon the brain, it is little wonder that the
mind may become enfeebled and lose its capacity for study or successful
effort. This is especially true of the young. The growth and development
of the brain having been once retarded, the youthful user of tobacco
(especially the foolish cigarette-smoker) has established a permanent
drawback which may hamper him all his life.

The young man addicted to the use of tobacco is often through its use
retarded in his career by mental languor or weakening will power, and by
mental incapacity. The keenness of mental perception is dulled, and the
ability to seize and hold an abstract thought is impaired. True, these
effects are not sharply obvious, as it would be impossible to contrast the
present condition of any one person with what it might have been. But the
comparison of large numbers conveys an instructive lesson. Scholars who
start well and give promise of a good future fail by the way. The honors
of the great schools, academies, and colleges are very largely taken by
the tobacco abstainers. This is proved by the result of repeated and
extensive comparisons of the advanced classes in a great number of
institutions in this country and in Europe. So true is this that any young
man who aspires to a noble career should bid farewell either to his
honorable ambition or to his tobacco, for the two very rarely travel
together. Consequently our military and naval academies and very many
seminaries and colleges prohibit the use of tobacco by their students. For
the same reasons the laws of many states very properly forbid the sale to
boys of tobacco, and especially of cigarettes.


307. Effect of Tobacco upon Character. Nor does tobacco spare the
morals. The tobacco-user is apt to manifest a selfish disregard of the
courtesies due to others. He brings to the presence of others a repulsive
breath, and clothing tainted with offensive odors. He poisons the
atmosphere that others must inhale, and disputes their rights to breathe a
pure, untainted air. The free use of tobacco by young people dulls the
acuteness of the moral senses, often leads to prevarication and deceit in
the indulgence, and is apt to draw one downward to bad associates. It is
not the speed but the direction that tells on the future character and
destiny of young men.



Additional Experiments.

  Experiment 132. _To illustrate the cooperation of certain parts of
  the body._ Tickle the inside of the nose with a feather. This does not
  interfere with the muscles of breathing, but they come to the help of
  the irritated part, and provoke sneezing to clear and protect the nose.

  Experiment 133. Pretend to aim a blow at a person's eye. Even if he
  is warned beforehand, the lids will close in spite of his effort to
  prevent them.

  Experiment 134. _To illustrate how sensations are referred to the
  ends of the nerves_. Strike the elbow end of the ulna against anything
  hard (commonly called "hitting the crazy bone") where the ulna nerve is
  exposed, and the little finger and the ring finger will tingle and
  become numb.

  Experiment 135. _To show that every nerve is independent of any
  other._ Press two fingers closely together. Let the point of the finest
  needle be carried ever so lightly across from one finger to another, and
  we can easily tell just when the needle leaves one finger and touches
  the other.

  Experiment 136. _To paralyze a nerve temporarily_. Throw one arm
  over the sharp edge of a chair-back, bringing the inner edge of the
  biceps directly over the edge of the chair. Press deep and hard for a
  few minutes. The deep pressure on the nerve of the arm will put the arm
  "asleep," causing numbness and tingling. The leg and foot often "get
  asleep" by deep pressure on the nerves of the thigh.

  Experiment 137. Press the ulnar nerve at the elbow, the prickling
  sensation is referred to the skin on the ulnar side of the hand.

  Experiment 138. Dip the elbow in ice-cold water; at first one feels
  the sensation of cold, owing to the effect on the cutaneous
  nerve-endings. Afterwards, when the trunk of the ulnar nerve is
  affected, pain is felt in the skin of the ulnar side of the hand, where
  the nerve terminates.




Chapter XI.

The Special Senses.



308. The Special Senses. In man certain special organs are set apart
the particular duty of which is to give information of the nature of the
relations which he sustains to the great world of things, and of which he
is but a mere speck. The special senses are the avenues by which we obtain
this information as to our bodily condition, the world around us, and the
manner in which it affects us.

Animals high in the scale are affected in so many different ways, and by
so many agencies, that a subdivision of labor becomes necessary that the
sense avenues may be rigidly guarded. One person alone may be a sufficient
watch on the deck of a sloop, but an ocean steamer needs a score or more
on guard, each with his special duty and at his own post. Or the senses
are like a series of disciplined picket-guards, along the outposts of the
mind, to take note of events, and to report to headquarters any
information which may be within the range of their duty.

Thus it is that we are provided with a number of special senses, by
means of which information is supplied regarding outward forces and
objects. These are touch, taste, smell, seeing, and hearing, to
which may be added the muscular sense and a sense of temperature.


309. General Sensations. The body, as we have learned, is made up of
a great number of complicated organs, each doing its own part of the
general work required for the life and vigor of the human organism. These
organs should all work in harmony for the good of the whole. We must have
some means of knowing whether this harmony is maintained, and of receiving
timely warning if any organ fails to do its particular duty.

Such information is supplied by the common or general sensations.
Thus we have a feeling of hunger or thirst indicating the need of food,
and a feeling of discomfort when imperfectly clad, informing us of the
need of more clothing.

To these may be added the sensation of pain, tickling, itching, and so on,
the needs of which arise from the complicated structure of the human body.
The great majority of sensations result from some stimulus or
outward agency; and yet some sensations, such as those of faintness,
restlessness, and fatigue seem to spring up within us in some mysterious
way, without any obvious cause.

310. Essentials of a Sense Organ. Certain essentials are necessary
for a sensation. First, there is a special structure adapted to a
particular kind of influence. Thus the ear is formed specially for being
stimulated by the waves of sound, while the eye is not influenced by
sound, but responds to the action of light. These special structures are
called terminal organs.

Again, a nerve proceeds from the special structure, which is in direct
communication with nerve cells in the brain at the region of
consciousness. This last point is important to remember, for if on
some account the impression is arrested in the connecting nerve, no
sensation will result. Thus a man whose spine has been injured may not
feel a severe pinch on either leg. The impression may be quite sufficient
to stimulate a nerve center in a healthy cord, so as to produce a marked
reflex act, but he has no sensation, because the injury has prevented the
impression from being carried up the cord to the higher centers in the
brain.

311. The Condition of Sensation. It is thus evident that while an
impression may be made upon a terminal organ, it cannot strictly be called
a sensation until the person becomes conscious of it. The consciousness
of an impression is, therefore, the essential element of a sensation.

It follows that sensation may be prevented in various ways. In the sense
of sight, for example, one person may be blind because the terminal organ,
or eye, is defective or diseased. Another may have perfect eyes and yet
have no sight, because a tumor presses on the nerve between the eye and
the brain. In this case, the impression fails because of the break in the
communication. Once more, the eye may be perfect and the nerve connection
unbroken, and yet the person cannot see, because the center in the brain
itself is injured from disease or accident, and cannot receive the
impression.


312. The Functions of the Brain Center in the Perception of an
Impression. Sensation is really the result of a change which occurs in
a nerve center in the brain, and yet we refer impressions to the various
terminal organs. Thus, when the skin is pinched, the sensation is referred
to the skin, although the perception is in the brain. We may think it is
the eyes that see objects; in reality, it is only the brain that takes
note of them.

This is largely the result of education and habit. From a blow
on the head one sees flashes of light as vividly as if torches actually
dance before the eyes. Impressions have reached the seeing-center in the
brain from irritation of the optic nerve, producing the same effect as
real lights would cause. In this case, however, knowing the cause of the
colors, the person is able to correct the erroneous conclusion.

As a result of a depraved condition of blood, the seeing-center itself may
be unduly stimulated, and a person may see objects which appear real. Thus
in an attack of delirium tremens, the victim of alcoholic poisoning sees
horrible and fantastic creatures. The diseased brain refers them as usual
to the external world; hence they appear real. As the sufferer's judgment
is warped by the alcoholic liquor, he cannot correct the impressions, and
is therefore deceived by them.


313. Organs of Special Sense. The organs of special sense, the means
by which we are brought into relation with surrounding objects, are
usually classed as five in number. They are sometimes fancifully called
"the five gateways of knowledge"--the skin, the organ of touch; the
tongue, of taste; the nose, of smell; the eye, of sight;
and the ear, of hearing.

[Illustration: Fig. 124.--Magnified View of a Papilla of the Skin, with a
Touch Corpuscle.]

314. The Organ of Touch. The organ of touch, or tactile sensibility,
is the most widely extended of all the special senses, and perhaps the
simplest. It is certainly the most precise and certain in its results. It
is this sense to which we instinctively appeal to escape from the
illusions into which the other senses may mislead us. It has its seat in
the skin all over the body, and in the mucous membrane of the nostrils.
All parts of the body, however, do not have this sense in an equal degree.

In Chapter IX. we learned that the superficial layers of the skin covers
and dips in between the papillæ. We also learned that these papillæ are
richly provided with blood-vessels and sensory nerve fibers (sec. 234).
Now these nerve fibers terminate in a peculiar way in those parts of the
body which are endowed with a very delicate sense of touch. In every
papilla are oval-shaped bodies about 1/300 of an inch long, around which
the nerve fibers wind, and which they finally enter. These are called
touch-bodies, or tactile corpuscles, and are found in great
numbers on the feet and toes, and more scantily in other places, as on the
edges of the eyelids.

Again, many of the nerve fibers terminate in corpuscles, the largest about
1/20 of an inch long, called Pacinian corpuscles. These are most
numerous in the palm of the hand and the sole of the foot. In the papillæ
of the red border of the lips the nerves end in capsules which enclose one
or more fibers, and are called end-bulbs.

The great majority of the nerve fibers which supply the skin do not end in
such well-defined organs. They oftener divide into exceedingly delicate
filaments, the terminations of which are traced with the greatest
difficulty.


315. The Sense of Touch. Touch is a sensation of contact referred to
the surface of the body. It includes three things,--the sense of
contact, the sense of pressure, and the sense of heat and
cold.

The sense of contact is the most important element in touch. By it we
learn of the form, size, and other properties of objects, as their
smoothness and hardness. As we all know, the sense of touch varies in
different parts of the skin. It is most acute where the outer skin is
thinnest. The tips of the fingers, the edges of the lips, and the tip of
the tongue are the most sensitive parts.

Even the nails, the teeth, and the hair have the sense of touch in a
slight degree. When the scarf skin is removed, the part is not more
sensitive to sense of contact. In fact, direct contact with the
unprotected true skin occasions pain, which effectually masks the feeling
of touch. The sense of touch is capable of education, and is generally
developed to an extraordinary degree in persons who are deprived of some
other special sense, as sight or hearing. We read of the famous blind
sculptor who was said to model excellent likenesses, guided entirely by
the sense of touch. An eminent authority on botany was a blind man, able
to distinguish rare plants by the fingers, and by the tip of the tongue.
The blind learn to read with facility by passing their fingers over raised
letters of a coarse type. It is impossible to contemplate, even for a
moment, the prominence assigned to the sense of touch in the physical
organism, without being impressed with the manifestations of design--the
work of an all-wise Creator.

316. Muscular Sense; Sense of Temperature; Pain. When a heavy object
is laid upon certain parts of the body, it produces a sensation of
pressure. By it we are enabled to estimate differences of weight. If
an attempt be made to raise this object, it offers resistance which the
muscles must overcome. This is known as the muscular sense. It
depends on sensory nerves originating in the muscles and carrying
impressions from them to the nerve centers.

The skin also judges, to a certain extent, of heat and cold.
These sensations can be felt only by the skin. Direct irritation of a
nerve does not give rise to them. Thus, the exposed pulp of a diseased
tooth, when irritated by cold fluids, gives rise to pain, and not to a
sensation of temperature. Various portions of the body have different
degrees of sensibility in this respect. The hand will bear a degree of
heat which would cause pain to some other parts of the body. Then, again,
the sensibility of the outer skin seems to affect the sensibility to heat,
for parts with a thin skin can bear less heat than portions with a thick
cuticle.

  Experiment 139. _To illustrate how the sense of touch is a matter
  of habit or education_. Shut both eyes, and let a friend run the tips of
  your fingers first lightly over a hard plane surface; then press hard,
  then lightly again, and the surface will seem to be concave.

  Experiment 140. Cross the middle over the index finger, roll a
  small marble between the fingers; one has a distinct impression of two
  marbles. Cross the fingers in the same way, and rub them against the
  point of the nose. A similar illusion is experienced.

  Experiment 141. _To test the sense of locality_. Ask a person to
  shut his eyes, touch some part of his body lightly with the point of a
  pin, and ask him to indicate the part touched.

As to the general temperature, this sense is relative and is much
modified by habit, for what is cold to an inhabitant of the torrid zone
would be warm to one accustomed to a very cold climate.

Pain is an excessive stimulation of the sensory nerves, and in it all
finer sensations are lost. Thus, when a piece of hot iron burns the hand,
the sensation is the same as when the iron is very cold, and extreme cold
feels like intense heat.

317. The Organ of Taste. The sense of taste is located chiefly
in the tongue, but may also be referred even to the regions of the fauces.
Taste, like touch, consists in a particular mode of nerve termination.

The tongue is a muscular organ covered with mucous membrane, and is
richly supplied with blood-vessels and nerves. By its complicated
movements it is an important factor in chewing, in swallowing, and in
articulate speech. The surface of the tongue is covered with irregular
projections, called papillæ,--fine hair-like processes, about 1/12 of
an inch high. Interspersed with these are the fungiform papillæ.
These are shaped something like a mushroom, and may often be detected by
their bright red points when the rest of the tongue is coated.

Towards the root of the tongue is another kind of papillæ, the
circumvallate, eight to fifteen in number, arranged in the form of
the letter V, with the apex directed backwards. These are so called
because they consist of a fungiform papilla surrounded by a fold of mucous
membrane, presenting the appearance of being walled around.

In many of the fungiform and most of the circumvallate papillæ are
peculiar structures called taste buds or taste goblets. These
exist in great numbers, and are believed to be connected with nerve
fibers. These taste buds are readily excited by savory substances, and
transmit the impression along the connected nerve.

The tongue is supplied with sensory fibers by branches from the fifth and
eighth pairs of cranial nerves. The former confers taste on the front part
of the tongue, and the latter on the back part. Branches of the latter
also pass to the soft palate and neighboring parts and confer taste on
them. The motor nerve of the tongue is the ninth pair, the hypoglossal.

[Illustration: Fig. 125.--The Tongue.

  A, epiglottis;
  B, glands at the base of tongue;
  C, tonsil;
  D, median circumvallate papilla,
  E, circumvallate papillæ;
  F, filiform papillæ;
  H, furrows on border of the tongue;
  K, fungiform papillæ.
]

318. The Sense of Taste. The sense of taste is excited by stimulation
of the mucous membrane of the tongue and of the palate, affecting the ends
of the nerve fibers. Taste is most acute in or near the circumvallate
papillæ. The middle of the tongue is scarcely sensitive to taste, while
the edges and the tip are, as a rule, highly sensitive.

Certain conditions are necessary that the sense of taste may be
exercised. First, the substance to be tasted must be in _solution_, or be
soluble in the fluids of the mouth. Insoluble substances are tasteless. If
we touch our tongue to a piece of rock crystal, there is a sensation of
contact or cold, but no sense of taste. On the other hand, when we bring
the tongue in contact with a piece of rock salt, we experience the
sensations of contact, coolness, and saline taste.

Again, the mucous membrane of the mouth must be _moist_. When the mouth is
dry, and receives substances not already in solution, there is no saliva
ready to dissolve them; hence, they are tasteless. This absence of taste
is common with the parched mouth during a fever.

The tongue assists in bringing the food in contact with the nerves, by
pressing it against the roof of the mouth and the soft palate, and thus is
produced the fullest sense of taste.

319. Physiological Conditions of Taste. The tongue is the seat of
sensations which are quite unlike each other. Thus, besides the sense of
taste, there is the sensation of touch, pressure, heat and cold, burning
or acrid feelings, and those produced by the application of the tongue to
an interrupted electric current. These are distinct sensations, due to
some chemical action excited probably in the touch cells, although the
true tastes may be excited by causes not strictly chemical. Thus a smart
tap on the tongue may excite the sensation of taste.

In the majority of persons the back of the tongue is most sensitive to
bitters, and the tip to sweets. Saline matters are perceived most
distinctly at the tip, and acid substances at the sides. The nerves of
taste are sensitive in an extraordinary degree to some articles of food
and certain drugs. For example, the taste of the various preparations of
quinine, peppermint, and wild cherry is got rid of with difficulty.

Like the other special senses, that of taste may become fatigued. The
repeated tasting of one substance rapidly deadens the sensibility,
probably by over-stimulation. Some savors so impress the nerves of taste
that others fail to make any impression. This principle is used to make
disagreeable medicine somewhat tasteless. Thus a few cloves, or grains of
coffee, or a bit of pepper, eaten before a dose of castor oil, renders it
less nauseous.

Flavor is something more than taste. It is in reality a mixed
sensation, in which smell and taste are both concerned, as is shown by the
common observation that one suffering from a cold in the head, which
blunts his sense of smell, loses the proper flavor of his food. So if a
person be blindfolded, and the nose pinched, he will be unable to
distinguish between an apple and an onion, if one be rubbed on the tongue
after the other. As soon as the nostrils are opened the difference is at
once perceived.

  Experiment 142. Put a drop of vinegar on a friend's tongue, or on
  your own. Notice how the papillæ of the tongue start up.

  Experiment 143. Rub different parts of the tongue with the pointed
  end of a piece of salt or gum-aloes, to show that the _back_ of the
  tongue is most sensitive to salt and bitter substances.

  Experiment 144. Repeat the same with some sweet or sour substances,
  to show that the _edges_ of the tongue are the most sensitive to these
  substances.

  Experiment 145. We often fail to distinguish between the sense of
  taste and that of smell. Chew some pure, roasted coffee, and it seems to
  have a distinct taste. Pinch the nose hard, and there is little taste.
  Coffee has a powerful odor, but only a feeble taste. The same is true of
  garlic, onions, and various spices.

  Experiment 146. Light helps the sense of taste. Shut the eyes, and
  palatable foods taste insipid. Pinch the nose, close the eyes, and see
  how palatable one half of a teaspoonful of cod-liver oil becomes.

  Experiment 147. Close the nostrils, shut the eyes, and attempt to
  distinguish by taste alone between a slice of an apple and one of a
  potato.

320. Modifications of the Sense of Taste. Taste is modified to a
great extent by habit, education, and other circumstances. Articles of
food that are unpleasant in early life often become agreeable in later
years. There is occasionally a craving, especially with people of a
peculiar nervous organization, for certain unnatural articles (as chalk
and laundry starch) which are eaten without the least repugnance. Again,
the most savory dishes may excite disgust, while the simplest articles may
have a delicious flavor to one long deprived of them. The taste for
certain articles is certainly acquired. This is often true of raw
tomatoes, olives, and especially of tobacco.

The organs of taste and smell may be regarded as necessary accessories of
the general apparatus of nutrition, and are, therefore, more or less
essential to the maintenance of animal life. While taste and smell are
generally maintained until the close of life, sight and hearing are often
impaired by time, and may be altogether destroyed, the other vital
functions remaining unimpaired.

321. Effect of Tobacco and Alcohol upon Taste. It would be remarkable
if tobacco should fail to injure the sense of taste. The effect produced
upon the tender papillæ of the tongue by the nicotine-loaded juices and
the acrid smoke tends to impair the delicate sensibility of the entire
surface. The keen appreciation of fine flavors is destroyed. The once
clear and enjoyable tastes of simple objects become dull and vapid; thus
highly spiced and seasoned articles of food are in demand, and then
follows continued indigestion, with all its suffering.

Again, the burning, almost caustic effect of the stronger alcoholic
drinks, and the acrid pungency of tobacco smoke, are disastrous to the
finer perceptions of both taste and odors.


322. Smell. The sense of smell is lodged in the delicate
membrane which lines the nasal cavities. The floor, sides, and roof of
these cavities are formed by certain bones of the cranium and the face.
Man, in common with all air-breathing animals, has two nasal cavities.
They communicate with the outer air by two nostrils opening in front,
while two other passages open into the pharynx behind.

To increase the area of the air passages, the two light, spongy turbinated
bones, one on each side, form narrow, winding channels. The mucous
membrane, with the branches of the olfactory nerve, lines the dividing
wall and the inner surfaces of these winding passages. Below all these
bones the lower turbinated bones may be said to divide the olfactory
chamber above from the ordinary air passages.

[Illustration: Fig. 126.--Distribution of Nerves over the Interior of the
Nostrils. (Outer wall.)

  A, branches of the nerves of smell--olfactory nerve, or ganglion;
  B, nerves of common sensation to the nostril;
  E, F, G, nerves to the, palate springing from a ganglion at C;
  H, vidian nerve, from which branches
  D, I, and J spring to be distributed to the nostrils.
]

The nerves which supply the nasal mucous membrane are derived from the
branches of the fifth and the first pair of cranial nerves,--the
olfactory. The latter, however, are the nerves of smell proper, and are
spread out in a kind of thick brush of minute nerve filaments. It is in
the mucous membrane of the uppermost part of the cavity of the nostril
that the nerve endings of smell proper reside. The other nerves which
supply the nostrils are those of common sensation (sec. 271).


323. The Sense of Smell. The sense of smell is excited by the contact
of odorous particles contained in the air, with the fibers of the
olfactory nerves, which are distributed over the delicate surface of
the upper parts of the nasal cavities. In the lower parts are the endings
of nerves of ordinary sensation. These latter nerves may be irritated by
some substance like ammonia, resulting in a powerfully pungent sensation.
This is not a true sensation of smell, but merely an irritation of a nerve
of general sensation.

In ordinary quiet breathing, the air simply flows along the lower nasal
passages into the pharynx, scarcely entering the olfactory chamber at all.
This is the reason why, when we wish to perceive a faint odor, we sniff up
the air sharply. By so doing, the air which is forcibly drawn into the
nostrils passes up even into the higher olfactory chamber, where some of
the floating particles of the odorous material come into contact with the
nerves of smell.

One of the most essential conditions of the sense of smell is that the
nasal passages be kept well bathed in the fluid secreted by the lining
membrane. At the beginning of a cold in the head, this membrane becomes
dry and swollen, thus preventing the entrance of air into the upper
chamber, deadening the sensibility of the nerves, and thus the sense of
smell is greatly diminished.

The delicacy of the sense of smell varies greatly in different individuals
and in different animals. It is generally more acute in savage races. It
is highly developed in both the carnivora and the herbivora. Many animals
are more highly endowed with this sense than is man. The dog, for example,
appears to depend on the sense of smell almost as much as on sight. It is
well known, also, that fishes have a sense of smell. Fragments of bait
thrown into the water soon attract them to a fishing ground, and at depths
which little or no light can penetrate. Deer, wild horses, and antelopes
probably surpass all other animals in having a vivid sense of smell.

Smell has been defined as "taste at a distance," and it is obvious that
these two senses not only form a natural group, but are clearly
associated in their physical action, especially in connection with the
perception of the flavor of food. The sense of odor gives us information
as to the quality of food and drink, and more especially as to the quality
of the air we breathe. Taste is at the gateway of the alimentary canal,
while smell acts as the sentinel of the respiratory tract. Just as taste
and flavor influence nutrition by affecting the digestive process, so the
agreeable odors about us, even those of the perfumes, play an important
part in the economy of life.


324. The Sense of Sight. The sight is well regarded as the
highest and the most perfect of all our senses. It plays so common and so
beneficent a part in the animal economy that we scarcely appreciate this
marvelous gift. Sight is essential not only to the simplest matters of
daily comfort and necessity, but is also of prime importance in the
culture of the mind and in the higher forms of pleasure. It opens to us
the widest and the most varied range of observation and enjoyment. The
pleasures and advantages it affords, directly and indirectly, have neither
cessation nor bounds.

Apart from its uses, the eye itself is an interesting and instructive
object of study. It presents beyond comparison the most beautiful example
of design and artistic workmanship to be found in the bodily structure. It
is the watchful sentinel and investigator of the external world. Unlike
the senses of taste and smell we seem, by the sense of vision, to become
aware of the existence of objects which are entirely apart from us, and
which have no direct or material link connecting them with our bodies. And
yet we are told that in vision the eye is affected by something which is
as material as any substance we taste or smell.

    [NOTE. "The higher intelligence of man is intimately associated with
    the perfection of the eye. Crystalline in its transparency, sensitive
    in receptivity, delicate in its adjustments, quick in its motions, the
    eye is a fitting servant for the eager soul, and, at times, the truest
    interpreter between man and man of the spirit's inmost workings. The
    rainbow's vivid hues and the pallor of the lily, the fair creations of
    art and the glance of mutual affection, all are pictured in its
    translucent depths, and transformed and glorified by the mind within.
    Banish vision, and the material universe shrinks for us to that which
    we may touch; sight alone sets us free to pierce the limitless abyss
    of space."--M'Kendrick and Snodgrass's _Physiology of the Senses_.]

Physicists tell us that this material, known as the _luminiferous ether_,
permeates the universe, and by its vibrations transmits movements which
affect the eye, giving rise to the sensation of light, and the perception
of even the most distant objects. Our eyes are so constructed as to
respond to the vibrations of this medium for the transmission of light.


325. The Eye. The eye, the outer instrument of vision, is a most
beautiful and ingenious machine. All its parts are arranged with such a
delicate adjustment to one another, and such an exquisite adaptation of
every part to the great object of the whole, that the eye is properly
regarded as one of the wonders of nature.

The eyeball is nearly spherical in shape, but is slightly elongated
from before backwards. The front part is clear and transparent, and bulges
somewhat prominently to allow the entrance of the rays of light. The eye
rests in a bowl-shaped socket, called the orbit, formed by parts of
various bones of the head and face. The margins of this cavity are formed
of strong bone which can withstand heavy blows. The socket is padded with
loose, fatty tissue, and certain membranes, which serve as a soft and
yielding bed in which the eyeball can rest and move without injury. In a
severe sickness this fatty tissue is absorbed, and this fact explains the
sunken appearance of the eyes.

The orbit is pierced through its posterior surface by an opening through
which the nerve of sight, the optic, passes to the eyeball. We may think
of the optic nerve holding the eyeball much as the stem holds the
apple. It is the function of this most important nerve to transmit
retinal impressions to the seat of consciousness in the brain, where they
are interpreted.

The eye is bathed with a watery fluid, and protected by the eyelids and
the eyebrows; it is moved in various directions, by muscles, all of which
will soon be described.

[Illustration: Fig. 127.--Section of the Human Eye.]

326. The Coats of the Eyeball. The eyeball proper is elastic but
firm, and is composed of three coats, or layers, each of which
performs important functions. These coats are the sclerotic, the
choroid, and the retina.

The sclerotic coat is the outside layer and enclosing membrane of the
eyeball. It is a tough, fibrous coat for the protection and maintenance of
the shape of the eye. It is white and glistening in appearance, and is in
part visible, to which the phrase, "the white of the eye," is applied. To
this coat, which serves as a kind of framework for the eye, are attached
the muscles which move the eyeball. In front of the globe, the sclerotic
passes into a transparent circular portion forming a window through which
one can see into the interior. This is the cornea.

The cornea, a clear, transparent, circular disk, fits into the
sclerotic, somewhat as the crystal fits into the metallic case of a watch,
forming a covering for its dial. It projects from the general contour of
the eyeball, not unlike a rounded bay-window, and is often spoken of as
the "window of the eye."

Lining the inner surface of the sclerotic is the second coat, the
choroid. It is dark in color and fragile in structure, and is made up
almost entirely of blood-vessels and nerves. As the choroid approaches the
front part of the eyeball, its parts become folded upon themselves into a
series of ridges, called ciliary processes. These folds gradually
become larger, and at last merge into the ciliary or accommodation
muscle of the eye. The circular space thus left in front by the
termination of the choroid is occupied by the iris, a thin, circular
curtain, suspended in the aqueous humor behind the cornea and in front of
the crystalline lens. In its center is a round opening for the admission
of light.

This is the pupil, which appears as if it were a black spot. The back
of the iris is lined with dark pigment, and as the coloring matter is more
or less abundant, we may have a variety of colors. This pigment layer and
that of the choroid and retina absorb the light entering the eye, so that
little is reflected.

The pupil appears black, just as the open doorway to a dark closet seems
black. The margin of the iris is firmly connected with the eyeball all
round, at the junction of the sclerotic and the cornea.

327. The Retina. The third and innermost coat of the eyeball is the
retina. This is the perceptive coat, without which it would be impossible
to see, and upon which the images of external objects are received. It
lines nearly the whole of the inner surface of the posterior chamber,
resting on the inner surface of the choroid. It is with the retina,
therefore, that the vitreous humor is in contact.

The retina is a very thin, delicate membrane. Although very thin, it
is made up of ten distinct layers, and is so complicated in structure that
not even a general description will be attempted in this book. It does not
extend quite to the front limits of the posterior chamber, but stops short
in a scalloped border, a little behind the ciliary processes. This is the
nerve coat of the eye, and forms the terminal organ of vision. It is
really an expansion of the ultimate fibers of the optic nerve, by means of
which impressions are sent to the brain.

The retina contains curious structures which can be seen only with the aid
of the microscope. For instance, a layer near the choroid is made up of
nerve cells arranged in innumerable cylinders called "rods and cones," and
packed together not unlike the seeds of a sunflower. These rods and cones
are to be regarded as the peculiar modes of termination of the nerve
filaments of the eye, just as the taste buds are the modes of termination
of the nerve of taste in the tongue, and just as the touch corpuscles are
the terminations of the nerves in the skin.

  Experiment 148. Close one eye and look steadily at the small a in
  the figure below. The other letters will also be visible at the same
  time. If now the page be brought slowly nearer to the eye while the eye
  is kept steadily looking at the small a, the large A will disappear at a
  certain point, reappearing when the book is brought still nearer.

  [Illustration: a oAx]

  On the reappearance of the A it will be noted that it comes into view
  from the inner side, the x being seen before it. If now we move the book
  towards its original place, the A will again disappear, coming again
  into view from the outer side when the o is seen before it.

328. Inner Structure of the Eye. Let us imagine an eyeball divided
through the middle from above downwards. Let us now start in front and
observe its parts (Fig. 127). We come first to the cornea, which has
just been described. The iris forms a sort of vertical partition,
dividing the cavity of the eyeball into two chambers.

[Illustration: Fig. 128.--Diagram illustrating the Manner in which the
Image of an Object is brought to a Focus on the Retina.]

The anterior chamber occupies the space between the cornea and the
iris, and is filled with a thin, watery fluid called the aqueous
humor.

The portion behind the iris forms the posterior chamber, and contains
the crystalline lens and a transparent, jelly-like fluid, the
vitreous humor. This fluid is never renewed, and its loss is
popularly described by the phrase, "when the eye runs out."

  Experiment 149. The retina is not sensitive where the optic nerve
  enters the eyeball. This is called the "blind spot." Put two ink-bottles
  about two feet apart, on a table covered with white paper. Close the
  left eye, and fix the right steadily on the left-hand inkstand,
  gradually varying the distance from the eye to the ink-bottle. At a
  certain distance the right-hand bottle will disappear; but nearer or
  farther than that, it will be plainly seen.

The vitreous humor fills about four-fifths of the eyeball and prevents it
from falling into a shapeless mass. It also serves to hold the choroid and
the retina in position, and to maintain the proper relations of the inner
structures of the eye.

The iris consists of a framework of connective tissue, the surface of
which is lined by cells containing pigment, which gives color to the eye.

Bundles of involuntary muscular fibers are found in the substance of the
iris. Some are arranged in a ring round the margin of the pupil; others
radiate from it like the spokes of a wheel. When the circular fibers
contract, the pupil is made smaller, but if these fibers relax, the
radiating fibers cause the pupil to dilate more or less widely.

329. The Crystalline Lens. Just behind the pupil and close to the iris is
a semi-solid, double-convex body, called the crystalline lens. It is
shaped like a magnifying glass, convex on each side, but with the
posterior surface more convex than the anterior. In health it is perfectly
clear and transparent, and highly elastic. When the lens becomes opaque,
from change in old age, or from ulcers or wounds, we have the disease
known as _cataract_.

[Illustration: Fig. 129.--Diagram showing the Change in the Lens during
Accommodation.

On the right the lens is arranged for distant vision, the ciliary muscle
is relaxed and the ligament D is tense, so flattening by its compression
the front of the lens C; on the left the muscle A is acting, and this
relaxes the ligament and allows the lens B to become more convex, and so
fitted for the vision of near objects.]

The lens is not placed loosely in the eyeball, but is enclosed in a
transparent and elastic capsule suspended throughout its circumference by
a ligament called the suspensory ligament. This ligament not only
retains the lens in place, but is capable of altering its shape. In
ordinary conditions of the eye, this ligament is kept tense so that the
front part of the lens is flattened somewhat by the pressure on it.

All around the edge, where the cornea, sclerotic, and choroid meet, is a
ring of involuntary muscular fibers, forming the ciliary muscle. When
these fibers contract, they draw forwards the attachment of the suspensory
ligament of the lens, the pressure of which on the lens is consequently
diminished. The elasticity of the lens causes it at once to bulge
forwards, and it becomes more convex.

The ciliary muscle is thus known as the muscle of accommodation,
because it has the power to accommodate the eye to near and distant
objects. In this respect it corresponds in its use to the adjusting screw
in the opera-glass and the microscope.


330. The Eye Compared to the Photographic Camera. As an optical
instrument, the eye may be aptly compared, in many particulars, to the
photographic camera. The latter, of course, is much simpler in
structure. The eyelid forms the cap, which being removed, the light from
the object streams through the eye and passes across the dark chamber to
the retina behind, which corresponds to the sensitive plate of the camera.
The transparent structures through which the rays of light pass represent
the lenses. To prevent any reflected light from striking the plate and
interfering with the sharpness of the picture, the interior of the
photographic camera box is darkened. The pigmented layer of the choroid
coat represents this blackened lining.

In the camera, the artist uses a thumb-screw to bring to a focus on the
sensitive plate the rays of light coming from objects at different
distances. Thus the lens of the camera may be moved nearer to or farther
from the object. In order to obtain clear images, the same result must be
accomplished by the eye. When the eye is focused for near objects, those
at a distance are blurred, and when focused for distant objects, those
near at hand are indistinct. Now, in the eye there is no arrangement to
alter the position of the lenses, as in the camera, but the same result is
obtained by what is called "accommodation."

Again, every camera has an arrangement of diaphragms regulating the amount
of light. This is a rude contrivance compared with the iris, which by
means of its muscular fibers can in a moment alter the size of the pupil,
thus serving a similar purpose.

[Illustration: Fig. 130.--Illustrating the manner in which the Image of an
Object is brought to a Focus in a Photographer's Camera.]

331. The Refractive Media of the Eye. The eye is a closed chamber
into which no light can pass but through the cornea. All the rays that
enter the eye must also pass through the crystalline lens, which brings
them to a focus, as any ordinary lens would do.

Now, if the media through which the light from an object passes to reach
the retina were all of the same density as the air, and were also plane
surfaces, an impression would be produced, but the image would not be
distinct. The action of the lens is aided by several refractive media
in the eye. These media are the cornea, the aqueous humor, and the
vitreous humor. By reason of their shape and density these media refract
the rays of light, and bring them to a focus upon the retina, thus aiding
in producing a sharp and distinct image of the object. Each point of the
image being the focus or meeting-place of a vast number of rays coming
from the corresponding point of the object is sufficiently bright to
stimulate the retina to action.[44]

Thus, the moment rays of light enter the eye they are bent out of their
course. By the action of the crystalline lens, aided by the refractive
media, the rays of light that are parallel when they fall upon the normal
eye are brought to a focus on the retina.

If the entire optical apparatus of the eye were rigid and immovable, one
of three things would be necessary, in order to obtain a clear image of an
object; for only parallel rays (that is, rays coming from objects distant
about thirty feet or more), are brought to a focus in the average normal
eye, unless some change is brought about in the refractive media. First,
the posterior wall of the eye must be moved further back, or the lens
would have to be capable of movement, or there must be some way of
increasing the focusing power of the lens. In the eye it is the convexity
of the lens that is altered so that the eye is capable of adjusting itself
to different distances.[45]

[Illustration: Fig. 131.--The Actual Size of the Test-Type, which should
be seen by the Normal Eye at a Distance of Twenty Feet.]

332. The More Common Defects of Vision. The eye may be free from
disease and perfectly sound, and yet vision be indistinct, because the
rays of light are not accurately brought to a focus on the retina. "Old
sight," known as presbyopia, is a common defect of vision in
advancing years. This is a partial loss of the power to accommodate the
eye to different distances. This defect is caused by an increase in the
density of the crystalline lens, and an accompanying diminution in the
ability to change its form. The far point of vision is not changed, but
the near point is removed so far from the eye, that small objects are no
longer visible.

[Illustration: Fig. 132.--Diagram illustrating the Hypermetropic
(far-sighted) Eye.

The image P′ of a point P falls behind the retina in the unaccommodated
eye. By means of a convex lens it may be focused on the retina without
accommodation (dotted lines). (To save space P is placed much too near the
eye.)]

Hence, when a person about forty-five years of age complains of dim light,
poor print, and tired eyes, the time has come to seek the advice of an
optician. A convex lens may be needed to aid the failing power to increase
the convexity of the lens, and to assist it in bringing the divergent rays
of light to a focus.

In "long sight," or hypermetropia both the near and far point of
vision are concerned, and there is no distinct vision at any distance
without a strain. It is a defect in the focus, dependent upon the form of
the eyes, and exists in childhood. The axis of the eyeball is too short,
and the focus falls beyond the retina, which is too near the cornea. In
childhood this strain may pass unnoticed, but, sooner or later it
manifests itself by a sense of fatigue, dizziness, and a blurred and
indistinct vision. The remedy is in the use of convex glasses to converge
parallel rays of light before they enter the eye. The muscles of
accommodation are thus relieved of their extra work.

"Short sight," known as myopia, is one of the commonest defects of
vision. In this defect the axis of the eye, or the distance between the
cornea and the retina, is too long and the rays of light are brought to a
focus in front of the retina. The tendency to short-sightedness exists in
many cases at birth, and is largely hereditary. It is alarmingly common
with those who make a severe demand upon the eyes. During childhood there
is a marked increase of near-sightedness. The results of imprudence and
abuse, in matters of eyesight, are so disastrous, especially during school
life, that the question of short sight becomes one of paramount
importance.

  Experiment 150. With a hand-mirror reflect the sunlight on a white
  wall. Look steadily at the spot for a full minute, and then let the
  mirror suddenly be removed. The "complementary" color--a dark spot--will
  appear.

  Experiment 151. _To show that impressions made upon the retina do
  not disappear at once_. Look steadily at a bright light for a moment or
  two, and then turn away suddenly, or shut the eyes. A gleam of light
  will be seen for a second or two.

  Look steadily at a well-lighted window for a few seconds, and then turn
  the eyes suddenly to a darkened wall. The window frame may be plainly
  seen for a moment.

  Glance at the sun for a moment, close the eyes and the image of the sun
  may be seen for a few seconds.

  Experiment 152. Take a round piece of white cardboard the size of a
  saucer, and paint it in alternate rings of red and yellow,--two primary
  colors. Thrust a pin through the center and rotate it rapidly. The eye
  perceives neither color, but orange,--the secondary color.

  Experiment 153. To note the shadows cast upon the retina by opaque
  matters in the vitreous humor (popularly known as floating specks, or
  gossamer threads), look through a small pin-hole in a card at a bright
  light covered by a ground-glass shade.

  Experiment 154. _To illustrate accommodation_. Standing near a
  source of light, close one eye, hold up both forefingers not quite in a
  line, keeping one finger about six or seven inches from the other eye,
  and the other forefinger about sixteen to eighteen inches from the eye.
  Look at the _near_ finger; a distinct image is obtained of it, while the
  far one is blurred or indistinct. Look at the far image; it becomes
  distinct, while the near one becomes blurred. Observe that in
  accommodating for the near object, one is conscious of a distinct
  effort.

In many cases near-sightedness becomes a serious matter and demands
skillful advice and careful treatment. To remedy this defect, something
must be done to throw farther back the rays proceeding from an object so
that they will come to a focus exactly on the retina. This is done by
means of concave glasses, properly adjusted to meet the conditions of the
eyes. The selection of suitable glasses calls for great care, as much harm
may be done by using glasses not properly fitted to the eye.

[Illustration: Fig. 133.--Diagram illustrating the Myopic (near-sighted)
Eye.

The image P′ of a distant object P falls in front of the retina even
without accommodation. By means of a concave lens (L) the image may be
made to fall on the retina (dotted lines). (To save space P is placed much
too near the eye).]

There is an optical condition of the eye known as astigmatism, in
which the cornea is usually at fault. In this defect of vision the
curvature of the cornea is greater in one meridian than in another. As a
result the rays from an object are not all brought to the same focus.
Objects appear distorted or are seen with unequal clearness. Glasses of a
peculiar shape are required to counteract this defect.


333. The Movements of the Eyes. In order that our eyes may be
efficient instruments of vision, it is necessary that they have the power
of moving independently of the head. The mechanical arrangement by which
the eyeballs are moved in different directions is quite simple. It is done
by six little muscles, arranged in three pairs, which, with one exception,
originate in the back of the cavity in which the eye rests. Four of these
muscles run a straight course and are called the _recti_. The remaining
two muscles bend in their course and are called _oblique_. The
coördination of these tiny muscles is marvellous in its delicacy,
accuracy, and rapidity of action.

When, for any cause, the coördination is faulty, "cross eye," technically
called strabismus, is produced. Thus, if the internal rectus is
shortened, the eye turns in; if the external rectus, the eye turns out,
producing what is known as "wall eye." It is thus evident that the beauty
of the internal mechanism of the eye has its fitting complement in the
precision, delicacy, and range of movement conferred upon it by its
muscles.

334. The Eyelids and Eyebrows. The eye is adorned and protected by
the eyelids, eyelashes, and eyebrows.

[Illustration: Fig. 134.--Muscles of the Eyeball.

  A, attachment of tendon connected with the three recti muscles;
  B, external rectus, divided and turned downward, to expose the internus
     rectus;
  C, inferior rectus;
  D, internal rectus;
  E, superior rectus;
  F, superior oblique;
  H, pulley and reflected portion of the superior oblique;
  K, inferior oblique; L, levator palpebri superioris;
  M, middle portion of the same muscle (L);
  N, optic nerve.
]

The eyelids, two in number, move over the front of the eyeball and
protect it from injury. They consist of folds of skin lined with mucous
membrane, kept in shape by a layer of fibrous material. Near the inner
surface of the lids is a row of twenty or thirty glands, known as the
_Meibomian glands_, which open on the free edges of each lid. When one of
these glands is blocked by its own secretion, the inflammation which
results is called a "sty."

The inner lining membrane of the eyelids is known as the conjunctiva;
it is richly supplied with blood-vessels and nerves. After lining the lids
it is reflected on to the eyeballs. It is this membrane which is
occasionally inflamed from taking cold.

The free edges of the lids are bordered with two or more rows of hairs
called the eyelashes, which serve both for ornament and for use. They
help to protect the eyes from dust, and to a certain extent to shade them.
Their loss gives a peculiar, unsightly look to the face.

The upper border of the orbit is provided with a fringe of short, stiff
hairs, the eyebrows. They help to shade the eyes from excessive
light, and to protect the eyelids from perspiration, which would otherwise
cause serious discomfort.


335. The Lacrymal Apparatus. Nature provides a special secretion, the
tears, to moisten and protect the eye. The apparatus producing this
secretion consists of the lacrymal or tear gland and lacrymal
canals or tear passages (Fig. 136).

Outside of the eyeball, in the loose, fatty tissue of the orbit, in the
upper and outer corner is the lacrymal or tear gland. It is
about the size of a small almond and from it lead several little canals
which open on the inner surface of the upper lid. The fluid from the gland
flows out by these openings over the eyeball, and is collected at the
inner or nasal corner. Here in each lid is a little reddish elevation, or
_lacrymal caruncle_, in which is an opening, communicating with a small
canal in the lid which joins the lacrymal sac, lodged between the
orbit and the bridge of the nose (Fig. 137).

From this sac there passes a channel, the nasal duct, about one-half
of an inch long, leading into the lower portion of the nostril. The fluid
which has flowed over the eye is drained off by these canals into the
nose. During sleep this secretion is much diminished. When the eyes are
open the quantity is sufficient to moisten the eyeball, the excess being
carried into the nose so gradually that the attention is not attracted to
it.

The lacrymal canals are at times blocked by inflammation of the nasal
duct, and the fluid collects in the corners of the eyelids and overflows
down the cheeks, producing much inconvenience. The lining membrane of the
eyelids through these canals is continuous with that of the nostrils.
Hence, when the lining membrane of the eye is red and swollen, as during a
cold, the nasal passages are also irritated, and when the nasal membrane
is inflamed, the irritation is apt to pass upwards and affect the eyelids.

336. The Tears. The lacrymal or tear gland is under the control of the
nervous system. Thus, if anything irritates the eyelids, the sensory
nerves are stimulated and the impression is carried to the brain. Thence
the nerve impulses travel to the lacrymal glands, leading to an increased
flow of their secretion. The irritation of the sensory nerves in the nasal
passages by smelling such substances as onions, or pungent salts, often
causes a copious flow of tears.

[Illustration: Fig. 135.--Lacrymal Gland and Ducts.

  A, lachrymal gland, the size of a small almond lodged in a shallow
     depression in the bones of the orbit;
  B, lachrymal ducts (usually seven), which form a row of openings into
     the conjunctival fold.
]

Various mental emotions, as joy and grief, may produce similar results. In
these cases the glands secrete the fluid in such quantities that it cannot
escape by the lacrymal canals, and the excess rolls over the cheeks as
tears. Excessive grief sometimes acts on the nerve centers in exactly the
opposite manner, so that the activity of the glands is arrested and less
fluid is secreted. This explains why some people do not shed tears in
times of deep grief.

  Experiment 155. Gently turn the inner part of your lower eyelid
  down. Look in a mirror, and the small lacrymal point, or opening into
  the nasal duct, may be observed.

337. Color-blindness. There is an abnormal condition of vision called
color-blindness, in which the power of discrimination between different
colors is impaired. Experiment shows that ninety-six out of every one
hundred men agree as to the identity or the difference of color, while the
remaining four show a defective perception of color.

The first may be said to have _normal vision_; the second are called
_color-blind_. It is a curious fact that ten times more men than women are
color-blind.

In its true sense, color-blindness is always congenital, often
hereditary. This condition of abnormal vision is totally incurable. A
person may be color-blind and not know it until the defect is accidentally
revealed. The common form of defective color-vision is the inability to
distinguish between _red_ and _green_. As green lights mean safety, and
red lights danger, on railroads, on shipboard, and elsewhere, it becomes
of paramount importance that no one who is color-blind should be employed
in such service. Various tests are now required by statute law in many
states to be used for the detection of such defects of vision among
employees in certain occupations.


338. School Life and the Eyesight. The eyes of children need more
care than those of adults, because their eyes are still in the course of
development. The eyes, like any other organ which is yet to attain its
full growth, require more care in their use than one which has already
reached its full size. They are peculiarly liable to be affected by
improper or defective light. Hence the care of the eyes during school life
is a matter of the most practical importance.

In no matter of health can the teacher do a more distinct service than in
looking after the eyesight of the pupils. Children suffering from
defective vision are sometimes punished by teachers for supposed
stupidity. Such pupils, as well as the deaf, are peculiarly sensitive to
their defects. Every schoolroom should have plenty of light; it should
come from either side or the rear, and should be regulated with suitable
shades and curtains.

Pupils should not be allowed to form the bad habit of reading with the
book held close to the eyes. The long search on maps for obscure names
printed in letters of bad and trying type should be discouraged. Straining
the eyes in trying to read from slates and blackboards, in the last hour
of the afternoon session, or in cloudy weather, may do a lifelong injury
to the eyesight. Avoid the use, so far as possible, especially in a
defective light, of text-books which are printed on battered type and worn
plates.

The seat and desk of each scholar should be carefully arranged to suit the
eyesight, as well as the bones and muscles. Special pains should be taken
with the near-sighted pupils, and those who return to school after an
attack of scarlet fever, measles, or diphtheria.

  Experiment 156. _To test color-blindness._ On no account is the
  person being tested to be asked to name a color. In a large class of
  students one is pretty sure to find some who are more or less
  color-blind. The common defects are for red and green.

Place worsteds on a white background in a good light. Select, as a test
color, a skein of light green color, such as would be obtained by mixing a
pure green with white. Ask the examinee to select and pick out from the
heap all those skeins which appear to him to be of the same color, whether
of lighter or darker shades. A color-blind person will select amongst
others some of the confusion-colors, _e.g._, pink, yellow. A colored plate
showing these should be hung up in the room. Any one who selects all the
greens and no confusion-colors has normal color vision. If, however, one
or more confusion-colors be selected, proceed as follows: select as a test
color a skein of pale rose. If the person be red-blind, he will choose
blue and violet; if green-blind, gray and green.

Select a bright red skein. The red-blind will select green and brown; the
green-blind picks out reds or lighter brown.

339. Practical Hints on the Care of the Eyes. The eye is an
exceedingly delicate and sensitive organ. While it is long-suffering, its
endurance has a limit. Like all the other organs of the body, the eyes are
better for moderate and rational use. More than any other organ they
require attention to the general health, as the condition of the skin,
exercise in the open air, good food, and proper habits of daily living.

The tissues of the eyes are peculiarly sensitive to any general influence.
Certain constitutional diseases, like rheumatism, lead-poisoning,
diphtheria, and measles often affect the eyes. Special care should be
taken with children's eyes during and after an attack of measles and
scarlet fever. The eyes of young infants should not be exposed to glaring
lights or to the direct rays of the sun, as when taken out in baby
carriages.

[Illustration: Fig. 136.--Showing the Relative Position of the Lacrymal
Apparatus, the Eyeball, and the Eyelids.

  A, lacrymal canals, with the minute orifices represented as two black
     dots (puncta lacrymalia) to the right;
  B, tendon of the orbicularis palpebrarum muscle; apparently under B is
     seen the lacrymal sac. The minute openings of the Meibomian glands are
     seen on the free margins of the eyelids.

Below A is seen a small conical elevation, with black dots (the lacrymal
papilla or caruncle).]

Glasses should be worn when they are needed. A failure to do this ususally
causes much unnecessary suffering. It is far from wise to postpone as long
as possible the first use of glasses. The selection and proper fitting of
glasses call for the combined skill of both the physician and the
optician. Obstinate headaches are often caused by defective vision, and
may disappear after discontinuing improper glasses.

The habit of reading, in the cars or elsewhere, the daily paper and
poorly printed books, with their blurred and indistinct type, is a severe
strain on the accommodation apparatus of the eyes. It is a dangerous
practice to read in bed at night, or while lying down in a darkened or
shaded room. This is especially true during recovery from illness. The
muscles of the eyes undergo excessive strain in accommodating themselves
to the unnatural position. The battered type, wood-pulp paper, and poor
presswork, now so commonly used in the cheap editions of books and
periodicals, are often injurious to the eyesight.

Reading-matter should not be held nearer to the eyes than is necessary to
make the print appear perfectly sharp and distinct. No print should be
read continuously that cannot be seen clearly at about eighteen inches.
Those who read music are especially liable to strain the eyes, because
exact vision is required to follow the notes. Persons who wear glasses for
reading should be careful to use them while reading music, and good light
is necessary to avoid any undue strain.

After reading steadily for some time, the eyes should be rested by closing
them a short period or by looking at some distant object, even if only for
a few moments. The book, the sewing, and work generally, should be held as
far from the eyes as is compatible with good vision. The natural tendency
is to reverse this rule. We should never read, write, sew, stitch, or
otherwise use the eyes when they smart or tingle, or when the sight is dim
or blurred. The eyes are then tired and need a rest. Much injury may be
done by reading in twilight, or by artificial light in the early morning,
and by reading and working in badly lighted and ill-ventilated rooms.

Good artificial light is much to be preferred to insufficient sunlight.
The artificial light should be sufficiently bright and steady; a fickering
light is always bad. Riding against a strong wind, especially on a
bicycle, may prove hurtful, at least for eyes that are inclined to any
kind of inflammation. The light reflected from snow is a common source of
injury to the eyes. It is a wise caution in passing from a dark room to
avoid looking immediately at the sun, an incandescent light, the
glistening snow, or other bright objects.

The eyes should never be rubbed, or the fingers thrust into them,[46] and
much less when they are irritated by any foreign substance. The sooner the
offending substance is removed the better.

[Illustration: Fig. 137.--Lacrymal Canals, Lacrymal Sac, and Nasal ducts,
opened by their Anterior Portion.]

340. Effect of Alcohol upon the Eye. The earlier and slighter forms
of injury done to the eye by the use of intoxicants are quite familiar:
the watery condition of the eye and of the lids, and the red and bleared
aspect of the organ. Both are the result of chronic inflammation, which
crowds the blood into the vessels of the cornea, making them bloodshot and
visible. The nerves controlling the circulation of the eye are partially
paralyzed, and thus the relaxed vessels become distended.

But more serious results ensue. Long use of intoxicants produces diseases
of the retina, involving in many cases marked diminution of acuteness as
well as quickness of vision, and at times distorted images upon the
surface of the retina. In other instances, the congestion of the optic
nerve is so serious as to involve a progressive wasting of that organ,
producing at first a hazy dimness of vision which gradually becomes worse
and worse, till total blindness may ensue.

It is beyond question that a wide comparison of cases by careful
observers proves that a large fraction of those who indulge in strong
drink suffer from some form of disease of the eye.


341. Effect of Tobacco upon Vision. Tobacco, in its distribution of
evil effects, does not neglect the senses and especially the eye. A
variety of vicious results is produced. The pungent smoke inflames the
lids. The narcotic dilates the pupil, causing dimness and confusion of
vision. A diseased condition occurs with severe pain in the eye followed
by impaired vision.

Oculists speak impressively of the ill effects of tobacco, and especially
of cigarettes, upon the eyes of the young. They mention a well-known
disease, tobacco blindness, usually beginning with color-blindness, and
progressing occasionally with increasing dimness of vision to entire loss
of sight.[47]


342. The Sense of Hearing. The structure of the human ear is much
more complicated than is generally supposed. It is an apparatus
constructed to respond to the waves of sound. As a whole, it may be
considered a peculiar form of nerve-ending.

The external ear forms only a part of a most elaborate apparatus whereby
sound waves may be transmitted inwards to the real organ of hearing. The
really sensitive part of the ear, in which the auditory nerve ends, is
buried for protection deep out of sight in the bones of the head; so deep
that sounds cannot directly affect it. Some arrangement, therefore, is
required for conducting the sounds inwards to this true organ.

[Illustration: Fig. 138.--The Pinna, or Auricle.]

In studying the structure of the ear, and how it is fitted to respond to
sonorous vibrations, we may divide it into three parts: the
sound-conducting part, known as the external ear, the middle
ear, and the deeply placed nerve portion, the inner ear.


343. The External Ear. The external ear consists of an expanded
portion known as the pinna or _auricle_, and of a passage, the
auditory canal or _meatus_, leading inwards from it. The surface of
the auricle is convoluted to collect and transmit the vibrations of air by
which sound is produced the auditory canal conducts these vibrations to
the tympanic membrane. Many animals move the auricle in the direction of
the sound. Thus the horse pricks up its ears when it hears a noise, the
better to judge of the direction of sounds.[48]

The external auditory meatus, the passage to the middle ear, is curved
and is about an inch and a quarter long. Near its outer portion are a
number of fine hairs slanting outwards to prevent the entrance of insects.
Embedded in the deeper parts of the canal are glands which secrete the
_cerumen_, or ear-wax, which keeps the canal moist, and helps to protect
it against foreign bodies and insects. As the result of a cold, this wax
may collect in sufficient quantities to block the passage, and to diminish
to a considerable extent the power of hearing.


344. The Middle Ear. At the inner end of the outer ear passage is the
tympanum, known as "the drum of the ear." It is a thin, oval membrane,
stretched at an angle across the deep end of the passage, which it
completely closes. The tympanum is thus a partition between the
passage of the outer ear and the cavity of the middle ear. On its inner
side is a small air chamber in the petrous portion of the temporal bone,
called the cavity of the tympanum. Its bony walls are lined with
mucous membrane similar to that lining the nose, mouth, and throat. On the
inner wall of the tympanum are two openings, the round window, or _foramen
rotundum_, and the oval window, or _foramen ovale_.

The tympanic cavity communicates with the back part of the throat, by the
Eustachian tube. This tube is about one and a half inches long and
lined with mucous membrane similar to that of the tympanic chamber and the
throat. This passage is usually closed, but is opened in the act of
swallowing. In health there is no communication between the chamber of the
middle ear and the outside, except by the Eustachian tube. Thus a throat
cold, with redness and swelling of the mucous membrane, is usually
accompanied with some degree of deafness, because the swelling may block
the lumen of the tube, and thus prevent the free passage of air to and
fro.

[Illustration: Fig. 139.--General View of the Organ of Hearing.

  A, pinna;
  B, cavity of the concha, showing the orifices of a great number of
     sebaceous glands;
  C, external auditory meatus;
  D, membrana tympani;
  F, incus;
  H, malleus;
  K, handle of malleus applied to the internal surface of the membrana
     tympani;
  L, tensor tympani muscle;
  between M and K is the tympanic cavity;
  N, Eustachian tube;
  O, P, semicircular canals;
  R, internal auditory canal;
  S, large nerve given off from the facial ganglion;
  T, facial and auditory nerves.
]

A most curious feature of the ear is the chain of tiny movable bones which
stretch across the cavity of the middle ear. They connect the tympanic
membrane with the labyrinth, and serve to convey the vibrations
communicated to the membrane across the cavity of the tympanum to the
internal ear. These bones are three in number, and from their shape are
called the <b>malleus</b>, or _hammer_, <b>incus</b>, or _anvil_; and
<b>stapes</b>, or _stirrup_.

The hammer is attached by its long handle to the inner surface of the drum
of the ear. The round head is connected with the anvil by a movable joint,
while the long projection of the anvil is similarly connected with the
stirrup bone. The plate of the stirrup is fixed by a membrane into the
oval window of the inner wall of the tympanic chamber.

These little bones are connected with each other and the tympanum by
ligaments and moved by three tiny muscles. Two are attached to the hammer,
and tighten and relax the drum; the other is attached to the stirrup, and
prevents it from being pushed too deeply into the oval window.

[Illustration: Fig. 140.--Ear-Bones. (Anterior View.)

  1, malleus, or hammer;
  2, incus, or anvil;
  3, stapes, or stirrup.
]

345. The Internal Ear. This forms one of the most delicate and
complex pieces of mechanism in the whole body. It is that portion of the
organ which receives the impression of sound, and carries it directly to
the seat of consciousness in the brain. We are then able to say that we
hear.

The internal ear, or bony labyrinth, consists of three distinct parts, or
variously shaped chambers, hollowed out in the temporal bone,--the
vestibule, the semicircular canals, and the cochlea, or snail's shell.

[Illustration: Fig. 141.--A Cast of the External Auditory Canal.
(Posterior view)]

The vestibule is the common cavity with which all the other portions
of the labyrinth connect. It is an oval-shaped chamber, about ⅓ of an
inch in diameter, occupying the middle part of the internal ear. It is on
the inner side of the oval window, which was closed, as we have seen, by
the stirrup bone. From one side of this vestibule, or central hall, the
three semicircular canals pass off, and from the other side, the cochlea.

The three semicircular canals, so called from their shape, are
simply bony tubes about 1/20 of an inch in width, making a curve of about
1/4 of an inch in diameter. They pass out from the vestibule, and after
bending around somewhat like a hoop, they return again to the vestibule.
Each bony canal contains within it a membranous canal, at the end of which
it is dilated to form an _ampulla_.

  Experiment 157. _To vibrate the tympanic membrane and the little
  ear-bones._ Shut the mouth, and pinch the nose tightly. Try to force air
  through the nose. The air dilates the Eustachian tube, and is forced
  into the ear-drum. The distinct crackle, or clicking sound, is due to
  the movement of the ear-bones and the tympanic membrane.

The cochlea, or snail's shell, is another chamber hollowed out in the
solid bone. It is coiled on itself somewhat like a snail's shell. There is
a central pillar, around which winds a long spiral canal. One passage from
the cochlea opens directly into the vestibule; the other leads to the
chamber of the middle ear, and is separated from it by the little round
window already described.

The cochlea contains thousands of the most minute cords, known as the
fibers or _organ of Corti_.[49] Under the microscope they present the
appearance of the keyboard of a piano. These fibers appear to vibrate in
sympathy with the countless shades of sounds which daily penetrate the
ear. From the hair-like processes on these tightly stretched fibers,
auditory impulses appear to be transmitted to the brain.

The tubes and chambers of the inner ear enclose and protect a delicate
membranous sac of exactly the same shape as themselves. Between the bony
walls of the passages and the membranous bag inside is a thin, clear
fluid, the _perilymph_. The membranous bag itself contains a similar
fluid, the _endolymph_. In this fluid are found some minute crystals of
lime like tiny particles of sand, called _otoliths_, or ear-stones. Every
movement of the fluid itself throws these grains from side to side.

[Illustration: Fig. 142.--Bony internal Ear of Right Side. (Magnified; the
upper figure of the natural size.)

  A, oval window (foramen ovale);
  B, C, D, semicircular canals;
  * represents the bulging part (ampulla) of each canal;
  E, F, G cochlea, H, round window (foramen rotundum).
]

The auditory nerve, or nerve of hearing, passes to the inner ear,
through a passage in the solid bone of the skull. Its minute filaments
spread at last over the inner walls of the membranous labyrinth in two
branches,--one going to the vestibule and the ampullæ at the ends of the
semicircular canals, the other leading to the cochlea.


346. Mechanism of Hearing. Waves of sound reach the ear, and are
directed by the concha to the external passage, at the end of which they
reach the tympanic membrane. When the sound-waves beat upon this thin
membrane, it is thrown into vibration, reproducing in its movements the
character of the air-vibrations that have fallen upon it.

Now the vibrations of the tympanic membrane are passed along the chain of
bones attached to its inner surface and reach the stirrup bone. The
stirrup now performs a to-and-fro movement at the oval window, passing the
auditory impulse inwards to the internal ear.

Every time the stirrup bone is pushed in and drawn out of the oval
window, the watery fluid (the perilymph) in the vestibule and inner ear is
set in motion more or less violently, according to the intensity of the
sound. The membranous labyrinth occupies the central portion of the
vestibule and the passages leading from it. When, therefore, the perilymph
is shaken it communicates the impulse to the fluid (endolymph) contained
in the inner membranous bag. The endolymph and the tiny grains of ear-sand
now perform their part in this marvelous and complex mechanism. They are
driven against the sides of the membranous bag, and so strike the ends of
the nerves of hearing, which transmit the auditory impulses to the seat of
sensation in the brain.

It is in the seat of sensation in the brain called the _sensorium_ that
the various auditory impulses received from different parts of the inner
ear are fused into one, and interpreted as sounds. It is the extent of the
vibrations that determines the loudness of the sound; the number of them
that determines the pitch.

  Experiment 158. Hold a ticking watch between the teeth, or touch
  the upper incisors with a vibrating tuning-fork; close both ears, and
  observe that the ticking or vibration is heard louder. Unstop one ear,
  and observe that the ticking or vibration is heard loudest in the
  stopped ear.

  Experiment 159. Hold a vibrating tuning-fork on the incisor teeth
  until you cannot hear it sounding. Close one or both ears, and you will
  hear it.

  Experiment 160. Listen to a ticking watch or a tuning-fork kept
  vibrating electrically. Close the mouth and nostrils, and take either a
  deep inspiration or deep expiration, so as to alter the tension of the
  air in the tympanum; in both cases the sound is diminished.

  Experiment 161. With a blindfolded person test his sense of the
  direction of sound, _e.g._, by clicking two coins together. It is very
  imperfect. Let a person press both auricles against the side of the
  head, and hold both hands vertically in front of each meatus. On a
  person making a sound in front, the observed person will refer it to a
  position behind him.

347. Practical Hints on the Care of the Ear. This very delicate and
complicated organ is often neglected when skilled treatment is urgently
needed, and it is often ignorantly and carelessly tampered with when it
should be let alone.

Never insert into the ear canal the corners of towels, ear spoons, the
ends of toothpicks, hairpins, or any other pointed instruments. It is a
needless and dangerous practice, usually causing, in time, some form of
inflammation. The abrasion of the skin in the canal thus produced affords
a favorable soil for the growth of vegetable parasites.

[Illustration: Fig. 143.--Diagram of the Middle and Internal Ear.]

This, in turn, may lead to a chronic inflammation of the canal and of the
tympanic membrane. Again, there is always risk that the elbow may be
jogged and the instrument pushed through the drum-head. There is, of
course, a natural impulse to relieve the itching of the ear. This should
be done with the tips of the fingers or not at all.

The popular notion that something should be put into the ear to cure
toothache is erroneous. This treatment does not cure a toothache, and may
lead to an injury to the delicate parts of the ear. A piece of absorbent
cotton, carefully inserted into the ear, may be worn out of doors, when
the cold air causes pain, but should be removed on coming into the house.

Frequent bathing in the cold water of ponds and rivers is liable to
injure both the ears and the general health. In salt-water bathing, the
force of the waves striking against the ears often leads to earache,
long-continued inflammation, or defective hearing; to diminish this risk,
insert into the ears a small plug of absorbent cotton.

The ears are often carelessly exposed to cold water and inclement weather.
Very cold water should never be used to bathe the ears and nostrils. Bathe
moderately and gently in lukewarm water, using a wash-rag in preference to
a sponge; dry gently and thoroughly. Children's ears are often rudely
washed, especially in the auditory canal. This is not at all necessary to
cleanliness, and may result in a local inflammation.

Never shout suddenly in a person's ear. The ear is not prepared for the
shock, and deafness has occasionally resulted. A sudden explosion, the
noise of a cannon, may burst the drum-head, especially if the Eustachian
tube be closed at the time. During heavy cannonading, soldiers are taught
to keep the mouth open to allow an equal tension of air.

[Illustration: Fig. 144.--Section of Cochlea.

From A straight downwards is the direction of the central column, to which
E points. B points to the projecting ridge, almost dividing the canal of
the tube into an upper compartment (D), and a lower (C).]

Insects may gain entrance to the ears and occasion annoyance, pain, and
fright, perhaps leading to vomiting, even to convulsions, with nervous
children. A lighted lamp held at the entrance of the ear will often induce
the offending insect to crawl out towards the light. A few drops of warm
water, sweet oil, or molasses, dropped into the ear, will help remove the
intruder.

When a discharge occurs from the ears, it is not best to plug them with
cotton wads. It only keeps in what should be got rid of. Do not go to
sleep with the head on a window sill or in any position, with the ears
exposed to draughts of cold or damp air.

No effort should be made to remove the ear wax unless it accumulates
unduly. The skin of the canal grows outward, and the extra wax and dust
will be naturally carried out, if let alone. Never employ any of the many
articles or "drops," advertised to cure deafness. Neuralgic pain in the
canal, usually classed as earache, may be due to decayed or improperly
filled teeth.

Quinine, so generally used in its many preparations for malaria, causes a
peculiar ringing or buzzing in the ears. This is a warning that it should
be taken in smaller doses, or perhaps stopped for a time. In some cases
quinine may produce temporary deafness.

The practice of snuffing up cold water into the nostrils is occasionally
followed by an acute inflammation of the middle ear, some of the water
finding its way through the Eustachian tube into this part of the organ of
hearing. The nasal douche, so often advised as a home remedy for nasal
catarrh, should be used only with great caution, and always in accordance
with detailed directions from a physician.

348. Effect of Tobacco upon the Hearing. The sense of hearing is
often injured by the use of tobacco. The irritating smoke filling all the
inner cavity of the mouth and throat, readily finds its way up the
Eustachian tube, dries the membrane, and irritates or inflames the
delicate mechanism of the inner ear. Thus may be produced a variety of
serious aural disturbances, such as unnatural noises, whistling, and
roaring, followed oftentimes by a partial loss of hearing.

Hearing may be impaired by the use of alcoholic beverages. Alcohol
inflames the mucous membrane of the throat, then by its nearness the
lining of the Eustachian tube, and finally may injure the delicate
apparatus of the internal ear.



Additional Experiments.

  Experiment 162. Use a small pair of wooden compasses, or an
  ordinary pair of dividers with their points guarded by a small piece of
  cork. Apply the points of the compasses lightly and simultaneously to
  different parts of the body, and ascertain at what distance apart the
  points are felt as two. The following is the order of sensibility: tip
  of tongue, tip of the middle finger, palm, forehead, and back of hand.

  Experiment 163. Test as in preceding experiment the skin of the
  arm, beginning at the shoulder and passing downwards. Observe that the
  sensibility is greater as one tests towards the fingers, and also in the
  transverse than in the long axis of the limb. In all cases compare the
  results obtained on both sides of the body.

  Experiment 164. By means of a spray-producer, spray the back of the
  hand with ether, and observe how the sensibility is abolished.

  Experiment 165. Touch your forehead with your forefinger; the
  finger appears to feel the contact, but on rubbing the forefinger
  rapidly over the forehead, it is the latter which is interpreted as
  "feeling" the finger.

  Experiment 166. Generally speaking, the sensation of touch is
  referred to the cutaneous surfaces. In certain cases, however, it is
  referred even beyond this. Holding firmly in one hand a cane or a
  pencil, touch an object therewith; the sensation is referred to the
  extremity of the cane or pencil.

  If, however, the cane or pencil be held loosely in one's hand, one
  experiences two sensations: one corresponding to the object touched, and
  the other due to the contact of the rod with the skin. The process of
  mastication affords a good example of the reference of sensations to and
  beyond the periphery of the body.

  Experiment 167. Prepare a strong solution of sulphate of quinine
  with the aid of a little sulphuric acid to dissolve it (_bitter_), a
  five-per-cent solution of sugar (_sweet_), a ten-per-cent solution of
  common salt (_saline_), and a one-per-cent solution of acetic acid
  (_acid_). Wipe the tongue dry, and lay on its tip a crystal of sugar. It
  is not tasted until it is dissolved.

  Experiment 168. Apply a crystal of sugar to the tip, and another to
  the back of the tongue. The sweet taste is more pronounced at the tip.

  Experiment 169. Repeat the process with sulphate of quinine in
  solution. It is scarcely tasted on the tip, but is tasted immediately on
  the back part of the tongue. Test where salines and acids are tasted
  most acutely.

  Experiment 170. _To illustrate the muscular sense_. Take two equal
  iron or lead weights; heat one and leave the other cold. The cold weight
  will feel the heavier.

  Experiment 171. Place a thin disk of _cold_ lead, the size of a
  silver dollar, on the forehead of a person whose eyes are closed; remove
  the disk, and on the same spot place two warm disks of equal size. The
  person will judge the latter to be about the same weight, or lighter,
  than the single cold disk.

  Experiment 172. Compare two similar wooden disks, and let the
  diameter of one be slightly greater than that of the other. Heat the
  smaller one to over 120° F., and it will be judged heavier than the
  larger cold one.

  Experiment 173. _To illustrate the influence of excitation of one
  sense organ on the other sense organs_. Small colored patches the shape
  and color of which are not distinctly visible may become so when a
  tuning-fork is kept vibrating near the ears. In other individuals the
  visual impressions are diminished by the same process.

  On listening to the ticking of a watch, the ticking sounds feebler or
  louder on looking at a source of light through glasses of different
  colors.

  If the finger be placed in cold or warm water the temperature appears to
  rise when a red glass is held in front of the eyes.

  Experiment 174. _Formation of an inverted image on the retina_.
  Take a freshly removed ox-eye; dissect the sclerotic from that part of
  its posterior segment near the optic nerve. Roll up a piece of blackened
  paper in the form of a tube, black surface innermost, and place the eye
  in it with the cornea directed forward. Look at an object--_e.g._, a
  candle-flame--and observe the inverted image of the flame shining
  through the retina and choroid, and notice how the image moves when the
  candle is moved.

  Experiment 175. Focus a candle-flame or other object on the
  ground-glass plate of an ordinary photographic camera, and observe the
  small inverted image.

  Experiment 176. _To illustrate spherical aberration_. Make a
  pin-hole in a blackened piece of cardboard; look at a light placed at a
  greater distance than the normal distance of accommodation. One will see
  a radiate figure with four to eight radii. The figures obtained from
  opposite eyes will probably differ in shape.

  Experiment 177. Hold a thin wooden rod or pencil about a foot from
  the eyes and look at a distant object. Note that the object appears
  double. Close the right eye; the left image disappears, and _vice
  versa_.

  Experiment 178. _To show the movements of the iris_. It is an
  extremely beautiful experiment, and one that can easily be made. Look
  through a pin-hole in a card at a uniform white surface as the white
  shade of an ordinary reading-lamp. With the right eye look through the
  pin-hole, the left eye being closed. Note the size of the (slightly
  dull) circular visual field. Open the left eye, the field becomes
  brighter and smaller (contraction of pupil); close the left eye, after
  an appreciable time, the field (now slightly dull) is seen gradually to
  expand. One can thus see and observe the rate of movements of his own
  iris.

  [Illustration: Fig. 145.]

  Experiment 179. _To show the blind spot_. The left eye being shut,
  let the right eye be fixed upon the cross as in Fig. 145. When the book
  is held at arm's length, both cross and round spot will be visible; but
  if the book be brought to about 8 inches from the eye, the gaze being
  kept steadily upon the cross, the round spot will at first disappear,
  but as the book, is brought still nearer both cross and round spot will
  again be seen.

  Experiment 180. _To illustrate the duration of retinal
  impressions_. On a circular white disk, about halfway between the center
  and circumference, fix a small, black, oblong disk, and rapidly rotate
  it by means of a rotating wheel. There appears a ring of gray on the
  black, showing that the impression on the retina lasts a certain time.

  [Illustration: Fig. 146.--Optic Disks.

  The disk A, having black and white sectors, when rotated rapidly gives
  an even gray tint as in B.]

  Experiment 181. Mark off a round piece of cardboard into black and
  white sectors as in A (Fig. 146). Attach it so as to rotate it rapidly,
  as on a sewing machine. An even gray tint will be produced as in B.

  Experiment 182._To illustrate imperfect visual judgments_. Make
  three round black dots, A, B, C, of the same size, in the same line, and
  let A and C be equidistant from B. Between A and B make several more
  dots of the same size. A and B will then appear to be farther apart than
  B and C.

    [Illustration:
      * * * * * *          *
      A         B          C
    ]

  For the same reason, of two squares absolutely identical in size, one
  marked with alternately clear and dark cross-bands, and the other with
  alternately clear and dark upright markings, the former will appear
  broader and the latter higher than the other.

  Experiment 183. Make on a white card two squares of equal size.
  Across the one draw _horizontal_ lines at equal distances, and in the
  other make similar _vertical_ lines. Hold them at some distance. The one
  with horizontal lines appears higher than it really is, while the one
  with vertical lines appears broader, i.e., both appear oblong.

  Experiment 184. Look at the row of letters (S) and figures (8). To

    [Illustration:
      S S S S S S S S       8 8 8 8 8 8 8 8
    ]

  some the upper halves of the letters and figures may appear to be of the
  same size as the lower halves, to others the lower halves may appear
  larger. Hold the figure upside down, and observe that there is a
  considerable difference between the two, the lower halves being
  considerably larger.

  Experiment 185. _To illustrate imperfect visual judgment_. The
  length of a line appears to vary according to the angle and direction of
  certain other lines in relation to it (Fig. 147). The length of the two
  vertical lines is the same, yet B appears much longer than A.

    [Illustration: Fig. 147.--To show False Estimate of Size.

              \   /
               \ /
        /|\     |
       / | \    |
         |      |
       A |    B |
         |      |
       \ | /    |
        \|/     |
               / \
              /   \
    ]

  Experiment 186. In indirect vision the appreciation of direction is
  still more imperfect. While leaning on a large table, fix a point on the
  table, and then try to arrange three small pieces of colored paper in a
  straight line. Invariably, the papers, being at a distance from the
  fixation-point, and being seen by indirect vision, are arranged, not in
  a straight line, but in the arc of a circle with a long radius.



Chapter XII.

The Throat and the Voice.



349. The Throat. The throat is a double highway, as it were,
through which the air we breathe traverses the larynx on its way to the
lungs, and through which the food we swallow reaches the œsophagus
on its passage to the stomach. It is, therefore, a very important region
of the body, being concerned in the great acts of respiration and
digestion.

The throat is enclosed and protected by various muscles and bony
structures, along which run the great blood-vessels that supply the head,
and the great nerve trunks that pass from the brain to the parts below.

We have already described the food passages (Chapter VI.) and the
air passages (Chapter VIII.).

To get a correct idea of the throat we should look into the wide-open
mouth of some friend. Depressing the tongue we can readily see the back
wall of the pharynx, which is common to the two main avenues leading
to the lungs and the stomach. Above, we notice the air passages, which
lead to the posterior cavities of the nose. We have already described the
hard palate, the soft palate, the uvula, and the tonsils (Fig. 46).

On looking directly beyond these organs, we see the beginning of the
downward passage,--the pharynx. If now the tongue be forcibly drawn
forward, a curved ridge may be seen behind it. This is the
epiglottis, which, as we have already learned shuts down, like the
lid of a box, over the top of the larynx (secs. 137 and 203).

The throat is lined with mucous membrane covered with ciliated epithelium,
which secretes a lubricating fluid which keeps the parts moist and
pliable. An excess of this secretion forms a thick, tenacious mass of
mucus, which irritates the passages and gives rise to efforts of hawking
and coughing to get rid of it.

350. The Larynx. The larynx, the essential organ of voice, forms
the box-like top of the windpipe. It is built of variously shaped
cartilages, connected by ligaments. It is clothed on the outside with
muscles; on the inside it is lined with mucous membrane, continuous with
that of the other air passages.

[Illustration: Fig. 148.--View of the Cartilages in front project and form
the lages and Ligaments of the "Adam's apple," plainly seen and Larynx.
(Anterior view.)

  A, hyoid bone;
  B, thyro-hyoid membrane;
  C, thyroid cartilage;
  D, erico-thyroid membrane;
  E, cricoid cartilage, lateral ligaments seen on each side;
  F, upper ring of the trachea.
  ("Adam's apple" is in the V-shaped groove on a line with B and C.)
]

The larynx has for a framework two cartilages, the thyroid and the
cricoid, one above the other. The larger of these, called the
thyroid, from a supposed resemblance to a shield, consists of two
extended wings which join in front, but are separated by a wide interval
behind. The united edges in front project and form the "Adam's apple"
plainly seen and easily felt on most people, especially on very lean men.

Above and from the sides rise two horns connected by bands to the hyoid
bone from which the larynx is suspended. This bone is attached by
muscles and ligaments to the skull. It lies at the base of the tongue, and
can be readily felt by the finger behind the chin at the angle of the jaw
and the neck (sec. 41 and Fig. 46). From the under side of the thyroid two
horns project downwards to become jointed to the cricoid. The thyroid thus
rests upon, and is movable on, the cricoid cartilage.

The cricoid cartilage, so called from its fancied resemblance to a
signet-ring, is smaller but thicker and stronger than the thyroid, and
forms the lower and back part of the cavity of the larynx. This cartilage
is quite sensitive to pressure from the fingers, and is the cause of the
sharp pain felt when we try to swallow a large and hard piece of food not
properly chewed.

[Illustration: Fig. 149.--Diagram of a Sectional of Nasal and Throat
Passages.

  C, nasal cavities;
  T, tongue;
  L, lower jaw;
  M, mouth;
  U, uvula;
  E, epiglottis;
  G, larynx;
  O, œsophagus.
]

On the upper edge of the cricoid cartilage are perched a pair of very
singular cartilages, pyramidal in shape, called the arytenoid, which
are of great importance in the production of the voice. These cartilages
are capped with little horn-like projections, and give attachment at their
anterior angles to the true vocal cords, and at their posterior
angles to the muscles which open and close the glottis, or upper
opening of the windpipe. When in their natural position the arytenoid
cartilages resemble somewhat the mouth of a pitcher, hence their name.

351. The Vocal Cords. The mucous membrane which lines the various
cartilages of the larynx is thrown into several folds. Thus, one fold, the
free edge of which is formed of a band of elastic fibers, passes
horizontally outwards from each side towards the middle line, at the level
of the base of the arytenoid cartilages. These folds are called the true
vocal cords, by the movements of which the voice is produced.

Above them are other folds of mucous membrane called the false vocal
cords, which take no part in the production of the voice. The
arrangement of the true vocal cords, projecting as they do towards the
middle line, reduces to a mere chink the space between the part of the
larynx above them and the part below them. This constriction of the larynx
is called the glottis.

[Illustration: Fig. 150.--View of the Cartilages and Ligaments of Larynx.
(Posterior view.)

  A, epiglottis;
  B, thyroid cartilage;
  C, arytenoid cartilage;
  D, ligament connecting lower cornu of the thyroid with the back of the
     cricoid cartilage;
  E, cricoid cartilage;
  F, upper ring of the trachea.
]

352. The Mechanism of the Voice. The mechanism of the voice may be
more easily understood by a study of Fig. 150. We have here the larynx,
viewed from behind, with all the soft parts in connection with it. On
looking down, the folds forming the true vocal cords are seen enclosing a
V-shaped aperture (the glottis), the narrow part being in front.

The form of this aperture may be changed by the delicately coordinate
activities of the muscles of the larynx. For instance, the vocal cords may
be brought so closely together that the space becomes a mere slit. Air
forced through the slit will throw the edges of the folds into vibration
and a sound will be produced.

The Variations in the form of the opening will determine the variations in
the sound. Now, if the various muscles of the larynx be relaxed, the
opening of the glottis is wider. Thus the air enters and leaves the larynx
during breathing, without throwing the cords into vibration enough to
produce any sound.

We may say that the production of the voice is effected by an arrangement
like that of some musical instruments, the sounds produced by the
vibrations of the vocal cords being modified by the tubes above and below.
All musical sounds are due to movements or vibrations occurring with a
certain regularity, and they differ in loudness, pitch, and quality.
Loudness of the sound depends upon the extent of the vibrations, pitch on
the rapidity of the vibrations, and quality on the admixture of tones
produced by vibrations of varying rates of rapidity, related to one
another.

[Illustration: Fig. 151.--Longitudinal Section of the Larynx. (Showing the
vocal cords.)

  A, epiglottis;
  B, section of hyoid bone;
  C, superior vocal cord;
  D, ventricle of the larynx;
  E, inferior vocal cord;
  F, section of the thyroid cartilage;
  H, section of anterior portion of the cricoid cartilage;
  K, trachea;
  L, section of the posterior portion of the cricoid cartilage;
  M, arytenoid cartilage;
  N, section of the arytenoid muscle.
]

353. Factors in the Production of the Voice. Muscles which pass from
the cricoid cartilage to the outer angle of the arytenoids act to bring
the vocal cords close together, and parallel to one another, so that the
space between them is narrowed to a slit. A strong expiration now drives
the air from the lungs through the slit, between the cords, and throws
them into vibration. The vibration is small in amount, but very rapid.
Other muscles are connected with the arytenoid cartilages which serve to
seperate the vocal cords and to widely open the glottis. The force of the
outgoing current of air determines the extent of the movement of the
cords, and thus the loudness of the sound will increase with greater force
of expiration.

We have just learned that the pitch of sound depends on the rapidity of
the vibrations. This depends on the length of cords and their tightness
for the shorter and tighter a string is, the higher is the note which its
vibration produces. The vocal cords of women are about one-third shorter
than those of men, hence the higher pitch of the notes they produce. In
children the vocal cords are shorter than in adults.[50] The cords of
tenor singers are also shorter than those of basses and baritones. The
muscles within the larynx, of course, play a very important part in
altering the tension of the vocal cords. Those qualities of the voice
which we speak of as sweet, harsh, and sympathetic depend to a great
extent upon the peculiar structure of the vocal cords of the individual.

Besides the physical condition of the vocal cords, as their degree of
smoothness, elasticity, thickness, and so on, other factors determine the
quality of an individual's voice. Thus, the general shape and structure of
the trachea, the larynx, the throat, and mouth all influence the quality
of voice. In fact, the air passages, both below and above the vibrating
cords, act as resonators, or resounding chambers, and intensify and modify
the sounds produced by the cords. It is this fact that prompts skillful
teachers of music and elocution to urge upon their pupils the necessity of
the mouth being properly opened during speech, and especially during
singing.

  Experiment 187. _To show the anatomy of the throat_. Study the
  general construction of the throat by the help of a hand mirror. Repeat
  the same on the throat of some friend.

  Experiment 188. _To show the construction of the vocal organs_. Get
  a butcher to furnish two windpipes from a sheep or a calf. They differ
  somewhat from the vocal organs of the human body, but will enable us to
  recognize the different parts which have been described, and thus to get
  a good idea of the gross anatomy.

  One specimen should be cut open lengthwise in the middle line in front,
  and the other cut in the same way from behind.

354. Speech. Speech is to be distinguished from voice. It may exist
without voice, as in a whisper. Speech consists of articulated
sounds, produced by the action of various parts of the mouth, throat, and
nose. Voice is common to most animals, but speech is the peculiar
privilege of man.

[Illustration: Fig. 152.--Diagramatic Horizontal Section of Larynx to show
the Direction of Pull of the Posterior Crico-Arytenoid Muscles, which
abduct the Vocal Cords. (Dotted lines show position in abduction.)]

The organ of speech is perhaps the most delicate and perfect _motor_
apparatus in the whole body. It has been calculated that upwards of 900
movements per minute can be made by the movable organs of speech during
reading, speaking, and singing. It is said that no less than a hundred
different muscles are called into action in talking. Each part of this
delicate apparatus is so admirably adjusted to every other that all parts
of this most complex machinery act in perfect harmony.

There are certain articulate sounds called vowel or vocal, from the fact
that they are produced by the vocal cords, and are but slightly modified
as they pass out of the mouth. The true vowels, _a, e, i, o, u_, can
all be sounded alone, and may be prolonged in expiration. These are the
sounds chiefly used in singing. The differences in their characters are
produced by changes in the position of the tongue, mouth, and lips.

Consonants are sounds produced by interruptions of the outgoing
current of air, but in some cases have no sound in themselves, and serve
merely to modify vowel sounds. Thus, when the interruption to the outgoing
current takes place by movements of the lips, we have the _labial_
consonants, _p_, _b_, _f_, and _v_. When the tongue, in relation with the
teeth or hard palate, obstructs the air, the _dental_ consonants, _d_,
_t_, _l_, and _s_ are produced. _Gutturals_, such as _k_, _g_, _ch_, _gh_,
and _r_, are due to the movements of the root of the tongue in connection
with the soft palate or pharynx.

To secure an easy and proper production of articulate sounds, the mouth,
teeth, lips, tongue, and palate should be in perfect order. The
modifications in articulation occasioned by a defect in the palate, or in
the uvula, by the loss of teeth, from disease, and from congenital
defects, are sufficiently familiar. We have seen that speech consists
essentially in a modification of the vocal sounds by the accessory organs,
or by parts above the larynx, the latter being the essential vocal
instrument.

Many animals have the power of making articulated sounds; a few have
risen, like man, to the dignity of sentences, but these are only by
imitation of the human voice. Both vowels and consonants can be
distinguished in the notes of birds, the vocal powers of which are
generally higher than those of mammals. The latter, as a rule, produce
only vowels, though some are also able to form consonants.

Persons idiotic from birth are incapable of producing any other vocal
sounds than inarticulate cries, although supplied with all the internal
means of articulation. Persons deaf and dumb are in the same situation,
though from a different cause; the one being incapable of imitating, and
the other being deprived of hearing the sounds to be imitated.

[Illustration: Fig. 153.--Direction of Pull of the Lateral
Crico-Arytenoids, which adduct the Vocal Cords. (Dotted lines show
position in adduction.)]

In _whispering_, the larynx takes scarcely any part in the production of
the sounds; the vocal cords remain apart and comparatively slack, and the
expiratory blast rushes through without setting them in vibration.

In _stammering_, spasmodic contraction of the diaphragm interrupts the
effort of expiration. The stammerer has full control of the mechanism of
articulation, but not of the expiratory blast. His larynx and his lips are
at his command, but not his diaphragm. To conquer this defect he must
train his muscles of respiration to calm and steady action during speech.
The _stutterer_, on the other hand, has full control of the muscles of
expiration. His diaphragm is well drilled, but his lips and tongue are
insubordinate.

355. The Care of the Throat and Voice. The throat, exposed as it is
to unwholesome and overheated air, irritating dust of the street,
factories, and workshops, is often inflamed, resulting in that common
ailment, _sore throat_. The parts are red, swollen, and quite painful on
swallowing. Speech is often indistinct, but there is no hoarseness or
cough unless the uvula is lengthened and tickles the back part of the
tongue. Slight sore throat rarely requires any special treatment, aside
from simple nursing.

The most frequent cause of throat trouble is the action of cold upon the
heated body, especially during active perspiration. For this reason a cold
bath should not be taken while a person is perspiring freely. The muscles
of the throat are frequently overstrained by loud talking, screaming,
shouting, or by reading aloud too much. People who strain or misuse the
voice often suffer from what is called "clergyman's sore throat." Attacks
of sore throat due to improper methods of breathing and of using the voice
should be treated by judicious elocutionary exercises and a system of
vocal gymnastics, under the direction of proper teachers.

Persons subject to throat disease should take special care to wear
suitable underclothing, adapted to the changes of the seasons. Frequent
baths are excellent tonics to the skin, and serve indirectly to protect
one liable to throat ailments from changes in the weather. It is not
prudent to muffle the neck in scarfs, furs, and wraps, unless perhaps
during an unusual exposure to cold. Such a dress for the neck only makes
the parts tender, and increases the liability to a sore throat.

Every teacher of elocution or of vocal music, entrusted with the training
of a voice of some value to its possessor, should have a good, practical
knowledge of the mechanism of the voice. Good voices are often injured by
injudicious management on the part of some incompetent instructor. It is
always prudent to cease speaking or singing in public the moment there is
any hoarseness or sore throat.

The voice should not be exercised just after a full meal, for a full
stomach interferes with the free play of the diaphragm. A sip of water
taken at convenient intervals, and held in the mouth for a moment or two,
will relieve the dryness of the throat during the use of the voice.


356. Effect of Alcohol upon the Throat and Voice. Alcoholic beverages
seriously injure the throat, and consequently the voice, by causing a
chronic inflammation of the membrane lining the larynx and the vocal
cords. The color is changed from the healthful pink to red, and the
natural smooth surface becomes roughened and swollen, and secretes a tough
phlegm.

The vocal cords usually suffer from this condition. They are thickened,
roughened, and enfeebled, the delicate vibration of the cords is impaired,
the clearness and purity of the vocal tones are gone, and instead the
voice has become rough and husky. So well known is this result that
vocalists, whose fortune is the purity and compass of their tones, are
scrupulously careful not to impair these fine qualities by convivial
indulgences.


357. Effect of Tobacco upon the Throat and Voice. The effect of
tobacco is often specially serious upon the throat, producing a disease
well known to physicians as "the smoker's sore throat." Still further, it
produces inflammation of the larynx, and thus entails disorders of the
vocal cords, involving rough voice and harsh tones. For this reason
vocalists rarely allow themselves to come under the narcotic influence of
tobacco smoke. It is stated that habitual smokers rarely have a normal
condition of the throat.



Additional Experiments.

  Experiment 189. _To illustrate the importance of the resonating
  cavity of the nose in articulation_. Pinch the nostrils, and try to
  pronounce slowly the words "Lincoln," "something," or any other words
  which require the sound of _m_, _ln_, or _ng_.

  [Illustration: Fig. 154.]

  Experiment 190. _To illustrate the passage of air through the
  glottis._ Take two strips of India rubber, and stretch them over the
  open end of a boy's "bean-blower," or any kind of a tube. Tie them
  tightly with thread, so that a chink will be left between them, as shown
  in Fig. 154. Force the air through such a tube by blowing hard, and if
  the strips are not too far apart a sound will be produced. The sound
  will vary in character, just as the bands are made tight or loose.

  Experiment 191. "A very good illustration of the action of the
  vocal bands in the production of the voice may be given by means of a
  piece of bamboo or any hollow wooden tube, and a strip of rubber, about
  an inch or an inch and a half wide, cut from the pure sheet rubber used
  by dentists.

  "One end of the tube is to be cut sloping in two directions, and the
  strip of sheet rubber is then to be wrapped round the tube, so as to
  leave a narrow slit terminating at the upper corners of the tube.

  "By blowing into the other end of the tube the edges of the rubber bands
  will be set in vibration, and by touching the vibrating membrane at
  different points so as to check its movements it may be shown that the
  pitch of the note emitted depends upon the length and breadth of the
  vibrating portion of the vocal bands."[51]--Dr. H. P. Bowditch.

    [NOTE. The limitations of a text-book on physiology for schools do not
    permit so full a description of the voice as the subject deserves. For
    additional details, the student is referred to Cohen's _The Throat and
    the Voice_, a volume in the "American Health Primer Series." Price 40
    cents.]




Chapter XIII.

Accidents and Emergencies.



358. Prompt Aid to the Injured. A large proportion of the accidents,
emergencies, and sudden sicknesses that happen do not call for medical or
surgical attention. For those that do require the services of a physician
or surgeon, much can be often done before the arrival of professional
help. Many a life has been saved and much suffering and anxiety prevented
by the prompt and efficient help of some person with a cool head, a steady
hand, and a practical knowledge of what to do first. Many of us can recall
with mingled admiration and gratitude the prompt services rendered our
families by some neighbor or friend in the presence of an emergency or
sudden illness.

In fact, what we have studied in the preceding chapters becomes tenfold
more interesting, instructive, and of value to us, if we are able to
supplement such study with its practical application to the treatment of
the more common and less serious accidents and emergencies.

While no book can teach one to have presence of mind, a cool head, or to
restrain a more or less excitable temperament in the midst of sudden
danger, yet assuredly with proper knowledge for a foundation, a certain
self-confidence may be acquired which will do much to prevent hasty
action, and to maintain a useful amount of self-control.

Space allows us to describe briefly in this chapter only a few of the
simplest helps in the more common accidents and emergencies
which are met with in everyday life.[52]

 359. Hints as to what to Do First. Retain so far as possible your
presence of mind, or, in other words, keep cool. This is an all-important
direction. Act promptly and quietly, but not with haste. Whatever you do,
do in earnest; and never act in a half-hearted manner in the presence of
danger. Of course, a knowledge of what to-do and how to do it will
contribute much towards that self-control and confidence that command
success. Be sure and send for a doctor at once if the emergency calls for
skilled service. All that is expected of you under such circumstances
is to tide over matters until the doctor comes.

[Illustration: Fig. 155.--Showing how Digital Compression should be
applied to the Brachial Artery.]

Do not presume upon any smattering of knowledge you have, to assume any
risk that might lead to serious results. Make the sufferer comfortable by
giving him an abundance of fresh air and placing him in a restful
position. Do all that is possible to keep back the crowd of curious
lookers-on, whom a morbid curiosity has gathered about the injured person.
Loosen all tight articles of clothing, as belts, collars, corsets, and
elastics. Avoid the use of alcoholic liquors. They are rarely of any real
service, and in many instances, as in bleeding, may do much harm.


360. Incised and Lacerated Wounds. An incised or cut wound
is one made by a sharp instrument, as when the finger is cut with a
knife. Such a wound bleeds freely because the clean-cut edges do not favor
the clotting of blood. In slight cuts the bleeding readily ceases, and the
wound heals by primary union, or by "first intention," as surgeons call
it.

Lacerated and contused wounds are made by a tearing or bruising
instrument, for example, catching the finger on a nail. Such wounds bleed
but little, and the edges and surfaces are rough and ragged.

If the incised wound is deep or extensive, a physician is necessary to
bring the cut edges together by stitches in order to get primary union.
Oftentimes, in severe cuts, and generally in lacerations, there is a loss
of tissue, so that the wound heals by "second intention"; that is, the
wound heals from the bottom by a deposit of new cells called
_granulations_, which gradually fill it up. The skin begins to grow from
the edges to the center, covering the new tissue and leaving a cicatrix or
scar with which every one is familiar.


361. Contusion and Bruises. An injury to the soft tissues, caused by
a blow from some blunt instrument, or a fall, is a contusion, or
bruise. It is more or less painful, followed by discoloration due to
the escape of blood under the skin, which often may not be torn through. A
black eye, a knee injured by a fall from a bicycle, and a finger hurt by a
baseball, are familiar examples of this sort of injury. Such injuries
ordinarily require very simple treatment.

The blood which has escaped from the capillaries is slowly absorbed,
changing color in the process, from blue black to green, and fading into a
light yellow. Wring out old towels or pieces of flannel in hot water, and
apply to the parts, changing as they become cool. For cold applications,
cloths wet with equal parts of water and alcohol, vinegar, and witch-hazel
may be used. Even if the injury is apparently slight it is always safe to
rest the parts for a few days.

When wounds are made with ragged edges, such as those made by broken
glass and splinters, more skill is called for. Remove every bit of
foreign substance. Wash the parts clean with one of the many
antiseptic solutions, bring the torn edges together, and hold them in
place with strips of plaster. Do not cover such an injury all over with
plaster, but leave room for the escape of the wound discharges. For an
outside dressing, use compresses made of clean cheese-cloth or strips of
any clean linen cloth. The antiseptic _corrosive-sublimate gauze_ on sale
at any drug store should be used if it can be had.

Wounds made by toy pistols, percussion-caps, and rusty nails and tools, if
neglected, often lead to serious results from blood-poisoning. A hot
flaxseed poultice may be needed for several days. Keep such wounds clean
by washing or syringing them twice a day with hot _antiseptics_, which are
poisons to _bacteria_ and kill them or prevent their growth. Bacteria are
widely distributed, and hence the utmost care should be taken to have
everything which is to come in contact with a wounded surface free from
the germs of inflammation. In brief, such injuries must be kept
_scrupulously neat_ and _surgically clean_.

[Illustration: Fig. 156.--Dotted Line showing the Course of the Brachial
Artery.]

The injured parts should be kept at rest. Movement and disturbance hinder
the healing process.


362. Bites of Mad Dogs. Remove the clothing at once, if only from the
bitten part, and apply a temporary ligature _above_ the wound. This
interrupts the activity of the circulation of the part, and to that
extent delays the absorption of the poisonous saliva by the blood-vessels
of the wound. A dog bite is really a lacerated and contused wound, and
lying in the little roughnesses, and between the shreds, is the poisonous
saliva. If by any means these projections and depressions affording the
lodgment can be removed, the poison cannot do much harm. If done with a
knife, the wound would be converted, practically, into an incised wound,
and would require treatment for such.

If a surgeon is at hand he would probably cut out the injured portion, or
cauterize it thoroughly. Professional aid is not always at our command,
and in such a case it would be well to take a poker, or other suitable
piece of iron, heat it _red_ hot in the fire, wipe off and destroy the
entire surface of the wound. As fast as destroyed, the tissue becomes
white. An iron, even at a white heat, gives less pain and at once destroys
the vitality of the part with which it comes in contact.

If the wound is at once well wiped out, and a stick of solid nitrate of
silver (lunar caustic) rapidly applied to the entire surface of the wound,
little danger is to be apprehended. Poultices and warm fomentations should
be applied to the injury to hasten the sloughing away of the part whose
vitality has been intentionally destroyed.

Any dog, after having bitten a person, is apt, under a mistaken belief, to
be at once killed. This should not be done. There is no more danger from a
dog-bite, unless the dog is suffering from the disease called _rabies_ or
is "mad," than from any other lacerated wound. The suspected animal should
be at once placed in confinement and watched, under proper safeguards, for
the appearance of any symptoms that indicate rabies.

Should no pronounced symptoms indicate this disease in the dog, a great
deal of unnecessary mental distress and worry can be saved both on the
part of the person bitten and his friends.

363. Injuries to the Blood-vessels. It is very important to know the
difference between the bleeding from an artery and that from a vein.

If an artery bleeds, the blood leaps in spurts, and is of a
bright scarlet color.

If a vein bleeds, the blood flows in a steady stream, and is of a
dark purple color.

If the capillaries are injured the blood merely oozes.

Bleeding from an artery is a dangerous matter in proportion to the size of
the vessel, and life itself may be speedily lost. Hemorrhage from a vein
or from the capillaries is rarely troublesome, and is ordinarily easily
checked, aided, if need be, by hot water, deep pressure, the application
of some form of iron styptic, or even powdered alum. When an artery is
bleeding, always remember to make deep pressure between the wound and the
heart. In all such cases send at once for the doctor.

[Illustration: Fig. 157.--Showing how Digital Compression should be
applied to the Femoral Artery.]

Do not be afraid to act at once. A resolute grip in the right place with
firm fingers will do well enough, until a twisted handkerchief, stout
cord, shoestring, suspender, or an improvised tourniquet[53] is ready to
take its place. If the flow of blood does not stop, change the pressure
until the right spot is found.

Sometimes it will do to seize a handful of dry earth and crowd it down
into the bleeding wound, with a firm pressure. Strips of an old
handkerchief, underclothing, or cotton wadding may also be used as a
compress, provided pressure is not neglected.

In the after-treatment it is of great importance that the wound and the
dressing should be kept free from bacteria by keeping everything
surgically clean.


364. Where and how to Apply Pressure. The principal places in which
to apply pressure when arteries are injured and bleeding should always be
kept in mind.

  Experiment 192. _How to tie a square knot_. If the student would
  render efficient help in accidents and emergencies, to say nothing of
  service on scores of other occasions, he must learn how to tie a square
  or "reef" knot. This knot is secure and does not slip as does the
  "granny" knot. The square knot is the one used by surgeons in ligating
  vessels and securing bandages. Unless one knew the difference, the
  insecure "granny" knot might be substituted.

  [Illustration: Fig. 158.--Showing how a Square Knot may be tied with a
  Cord and a Handkerchief.]

  A square knot is tied by holding an end of a bandage or cord in
  each hand, and then passing the end in the _right_ hand over the one in
  the left and tying; the end now in the _left_ hand is passed over the
  one in the right and again tied.

If in the finger, grasp it with the thumb and forefinger, and pinch
it firmly on each side; if in the hand, press on the bleeding spot,
or press with the thumb just above and in front of the wrist.

For injuries below the elbow, grasp the upper part of the arm with
the hands, and squeeze hard. The main artery runs in the middle line of
the bend of the elbow. Tie the knotted cord here, and bend the forearm so
as to press hard against the knot.

For the upper arm, press with the fingers against the bone on the
inner side, and just on the edge of the swell of the biceps muscle. Now we
are ready for the knotted cord. Take a stout stick of wood, about a foot
long, and twist the cord hard with it, bringing the knot firmly over the
artery.

For the foot or leg, pressure as before, in the hollow behind
the knee, just above the calf of the leg. Bend the thigh towards the
abdomen and bring the leg up against the thigh, with the knot in the bend
of the knee.


365. Bleeding from the Stomach and Lungs. Blood that comes from the
lungs is bright red, frothy, or "soapy." There is rarely much; it usually
follows coughing, feels warm, and has a salty taste. This is a grave
symptom. Perfect rest on the back in bed and quiet must be insisted upon.
Bits of ice should be eaten freely. Loosen the clothing, keep the
shoulders well raised, and the body in a reclining position and absolutely
at rest. Do not give alcoholic drinks.

Blood from the stomach is not frothy, has a sour taste, and is
usually dark colored, looking somewhat like coffee grounds. It is more in
quantity than from the lungs, and is apt to be mixed with food. Employ the
same treatment, except that the person should be kept flat on the back.


366. Bleeding from the Nose. This is the most frequent and the least
dangerous of the various forms of bleeding. Let the patient sit upright;
leaning forward with the head low only increases the hemorrhage. Raise the
arm on the bleeding side; do not blow the nose. Wring two towels out of
cold water; wrap one around the neck and the other properly folded over
the forehead and upper part of the nose.

Add a teaspoonful of powdered _alum_ to a cup of water, and snuff it up
from the hand. If necessary, soak in alum water a piece of absorbent
cotton, which has been wound around the pointed end of a pencil or
penholder; plug the nostril by pushing it up with a twisting motion until
firmly lodged.


367. Burns or Scalds. Burns or scalds are dangerous in proportion to
their extent and depth. A child may have one of his fingers burned off
with less danger to life than an extensive scald of his back and legs. A
deep or extensive burn or scald should always have prompt medical
attendance.

In burns by acids, bathe the parts with an alkaline fluid, as diluted
ammonia, or strong soda in solution, and afterwards dress the burn.

In burns caused by lime, caustic potash, and other alkalies, soak the
parts with vinegar diluted with water; lemon juice, or any other diluted
acid.

Remove the clothing with the greatest care. Do not pull, but carefully cut
and coax the clothes away from the burned places. Save the skin unbroken
if possible, taking care not to break the blisters. The secret of
treatment is to prevent friction, and to keep out the air. If
the burn is slight, put on strips of soft linen soaked in a strong
solution of baking-soda and water, one heaping table spoonful to a cupful
of water. This is especially good for scalds.

[Illustration: Fig. 159.--Dotted Line showing the Course of the Femoral
Artery.]

_Carron oil_ is one of the best applications. It is simply half
linseed-oil and half lime-water shaken together. A few tablespoonfuls of
carbolic acid solution to one pint may be added to this mixture to help
deaden the pain. Soak strips of old linen or absorbent cotton in this
time-honored remedy, and gently apply.

If carbolized or even plain _vaseline_ is at hand, spread it freely on
strips of old linen, and cover well the burnt parts, keeping out the air
with other strips carefully laid on. Simple cold water is better than
flour, starch, toilet powder, cotton batting, and other things which are
apt to stick, and make an after-examination very painful.

[Illustration: Fig. 160.--Showing how Hemorrhage from the Femoral Artery
may be arrested by the Use of an Improvised Apparatus (technically called
a _Tourniquet_).]

368. Frost Bites. The ears, toes, nose, and fingers are occasionally
frozen, or frost-bitten. No warm air, warm water, or fire should be
allowed near the frozen parts until the natural temperature is nearly
restored. Rub the frozen part vigorously with snow or snow-water in a cold
room. Continue this until a burning, tingling pain is felt, when all
active treatment should cease.

Pain shows that warmth and circulation are beginning to return. The after
effects of a frost bite are precisely like those of a burn, and require
similar treatment. Poultices made from scraped raw potatoes afford much
comfort for an after treatment.


369. Catching the Clothing on Fire. When the clothing catches fire,
throw the person down on the ground or floor, as the flames will tend
less to rise toward the mouth and nostrils. Then without a moment's delay,
roll the person in a carpet or hearth-rug, so as to stifle the flames,
leaving only the head out for breathing.

If no carpet or rug can be had, then take off your coat, shawl, or cloak
and use it instead. Keep the flame as much as possible from the face, so
as to prevent the entrance of the hot air into the lungs. This can be done
by beginning at the neck and shoulders with the wrapping.


370. Foreign Bodies in the Throat. Bits of food or other small
objects sometimes get lodged in the throat, and are easily extracted by
the forefinger, by sharp slaps on the back, or expelled by vomiting. If it
is a sliver from a toothpick, match, or fishbone, it is no easy matter to
remove it; for it generally sticks into the lining of the passage. If the
object has actually passed into the windpipe, and is followed by sudden
fits of spasmodic coughing, with a dusky hue to the face and fingers,
surgical help must be called without delay.

If a foreign body, like coins, pencils, keys, fruit-stones, etc., is
swallowed, it is not wise to give a physic. Give plenty of hard-boiled
eggs, cheese, and crackers, so that the intruding substance maybe enfolded
in a mass of solid food and allowed to pass off in the natural way.


371. Foreign Bodies in the Nose. Children are apt to push beans,
peas, fruit-stones, buttons, and other small objects, into the nose.
Sometimes we can get the child to help by blowing the nose hard. At other
times, a sharp blow between the shoulders will cause the substance to fall
out. If it is a pea or bean, which is apt to swell with the warmth and
moisture, call in medical help at once.


372. Foreign Bodies in the Ear. It is a much more difficult matter to
get foreign bodies out of the ear than from the nose. Syringe in a little
warm water, which will often wash out the substance. If live insects get
into the ear, drop in a little sweet oil, melted vaseline, salt and water,
or even warm molasses.

If the tip of the ear is pulled up gently, the liquid will flow in more
readily. If a light is held close to the outside ear, the insect may be
coaxed to crawl out towards the outer opening of the ear, being attracted
by the bright flame.

373. Foreign Bodies in the Eye. Cinders, particles of dust, and other
small substances, often get into the eye, and cause much pain. It will
only make bad matters worse to rub the eye. Often the copious flow of
tears will wash the substance away. It is sometimes seen, and removed
simply by the twisted corner of a handkerchief carefully used. If it is
not removed, or even found, in this way, the upper lid must be turned
back.

[Illustration: Fig. 161.--Showing how the Upper Eyelid may be everted with
a Pencil or Penholder.]

This is done usually as follows: Seize the lashes between the thumb and
forefinger, and draw the edge of the lid away from the eyeball. Now,
telling the patient to look down, press a slender lead-pencil or penholder
against the lid, parallel to and above the edge, and then pull the edge
up, and turn it over the pencil by means of the lashes.

The eye is now readily examined, and usually the foreign body is easily
seen and removed. Do not increase the trouble by rubbing the eye after you
fail, but get at once skilled help. After the substance has been removed,
bathe the eye for a time with hot water.

If lime gets into the eye, it may do a great amount of mischief, and
generally requires medical advice, or permanent injury will result. Until
such advice can be had, bathe the injured parts freely with a weak
solution of vinegar and hot water.

374. Broken Bones. Loss of power, pain, and swelling are symptoms of
a broken bone that may be easily recognized. Broken limbs should always be
handled with great care and tenderness. If the accident happens in the
woods, the limb should be bound with handkerchiefs, suspenders, or strips
of clothing, to a piece of board, pasteboard, or bark, padded with moss or
grass, which will do well enough for a temporary splint. Always put a
broken arm into a sling after the splints are on.

[Illustration: Fig. 162.--Showing how an Umbrella may be used as a
Temporary Splint in Fracture of the Leg.]

Never move the injured person until the limb is made safe from further
injuries by putting on temporary splints. If you do not need to move the
person, keep the limb in a natural, easy position, until the doctor comes.

Remember that this treatment for broken bones is only to enable the
patient to be moved without further injury. A surgeon is needed at once to
set the broken bone.


[Illustration: Fig. 163.--Showing how a Pillow may be used as a Temporary
Splint in Fracture of the Leg.]

375. Fainting. A fainting person should be laid flat at once. Give
plenty of fresh air, and dash cold water, if necessary, on the head and
neck. Loosen all tight clothing. Smelling-salts may be held to the nose,
to excite the nerves of sensation.

376. Epileptic and Hysterical Fits, Convulsions of Children.
Sufferers from "fits" are more or less common. In _epilepsy_, the sufferer
falls with a peculiar cry; a loss of consciousness, a moment of rigidity,
and violent convulsions follow. There is foaming at the mouth, the eyes
are rolled up, and the tongue or lips are often bitten. When the fit is
over the patient remains in a dazed, stupid state for some time. It is a
mistake to struggle with such patients, or to hold them down and keep them
quiet. It does more harm than good.

See that the person does not injure himself; crowd a pad made from a
folded handkerchief or towel between the teeth, to prevent biting of the
lips or tongue. Do not try to make the sufferer swallow any drink.
Unfasten the clothes, especially about the neck and chest. Persons who are
subject to such fits should rarely go out alone, and never into crowded or
excited gatherings of any kind.

_Hysterical fits_ almost always occur in young women. Such patients never
bite their tongue nor hurt themselves. Placing a towel wrung out in cold
water across the face, or dashing a little cold water on the face or
neck, will usually cut short the fit, speaking firmly to the patient at
the same time. Never sympathize too much with such patients; it will only
make them a great deal worse.

377. Asphyxia. Asphyxia is from the Greek, and means an "absence of
pulse." This states a fact, but not the cause. The word is now commonly
used to mean _suspended animation_. When for any reason the proper supply
of oxygen is cut off, the tissues rapidly load up with carbon dioxid. The
blood turns dark, and does not circulate. The healthy red or pink look of
the lips and finger-nails becomes a dusky purple. The person is suffering
from a lack of oxygen; that is, from asphyxia, or suffocation.
It is evident there can be several varieties of asphyxia, as in apparent
drowning, strangulation and hanging, inhalation of gases, etc.

The first and essential thing to do is to give fresh air. Remove the
person to the open air and place him on his back. Remove tight clothing
about the throat and waist, dash on cold water, give a few drops of
ammonia in hot water or hot ginger tea. Friction applied to the limbs
should be kept up. If necessary, use artificial respiration by the
Sylvester method (sec. 380).

The chief dangers from poisoning by noxious gases come from the fumes of
burning coal in the furnace, stove, or range; from "blowing out" gas,
turning it down, and having it blown out by a draught; from the foul air
often found in old wells; from the fumes of charcoal and the foul air of
mines.

378. Apparent Drowning. Remove all tight clothing from the neck,
chest, and waist. Sweep the forefinger, covered with a handkerchief or
towel, round the mouth, to free it from froth and mucus. Turn the body on
the face, raising it a little, with the hands under the hips, to allow any
water to run out from the air passages. Take only a moment for this.

Lay the person flat upon the back, with a folded coat, or pad of any
kind, to keep the shoulders raised a little. Remove all the wet, clinging
clothing that is convenient. If in a room or sheltered place, strip the
body, and wrap it in blankets, overcoats, etc. If at hand, use bottles of
hot water, hot flats, or bags of hot sand round the limbs and feet. Watch
the tongue: it generally tends to slip back, and to shut off the air from
the glottis. Wrap a coarse towel round the tip of the tongue, and keep it
well pulled forward.

The main thing to do is to keep up artificial respiration until the
natural breathing comes, or all hope is lost. This is the simplest way to
do it: The person lies on the back; let some one kneel behind the head.
Grasp both arms near the elbows, and sweep them upward above the head
until they nearly touch. Make a firm pull for a moment. This tends to fill
the lungs with air by drawing the ribs up, and making the chest cavity
larger. Now return the arms to the sides of the body until they press hard
against the ribs. This tends to force out the air. This makes artificially
a complete act of respiration. Repeat this act about fifteen times every
minute.

[Illustration: Fig. 164.--The Sylvester Method. (First
movement--inspiration.)]

All this may be kept up for several hours. The first sign of recovery is
often seen in the slight pinkish tinge of the lips or finger-nails. That
the pulse cannot be felt at the wrist is of little value in itself as a
sign of death. Life may be present when only the most experienced ear can
detect the faintest heart-beat.

When a person can breathe, even a little, he can swallow. Hold
smelling-salts or hartshorn to the nose. Put one teaspoonful of the
aromatic spirits of ammonia, or even of ammonia water, into a half-glass
of hot water, and give a few teaspoonfuls of this mixture every few
minutes. Meanwhile do not fail to keep up artificial warmth in the most
vigorous manner.

379. Methods of Artificial Respiration. There are several
well-established methods of artificial respiration. The two known as the
Sylvester and the Marshall Hall methods are generally accepted
as efficient and practical.

[Illustration: Fig. 165.--The Sylvester Method. (Second
movement--expiration.)]

380. The Sylvester Method. The water and mucus are supposed to have
been removed from the interior of the body by the means above described
(sec. 378).

The patient is to be placed on his back, with a roll made of a coat or a
shawl under the shoulders; the tongue should then be drawn forward and
retained by a handkerchief which is placed across the extended organ and
carried under the chin, then crossed and tied at the back of the neck. An
elastic band or small rubber tube or a suspender may be used for the same
purpose.

The attendant should kneel at the head and grasp the elbows of the
patient and draw them upward until the hands are carried above the head
and kept in this position until one, two, three, can be slowly counted.
This movement elevates the ribs, expands the chest, and creates a vacuum
in the lungs into which the air rushes, or in other words, the movement
produces _inspiration_. The elbows are then slowly carried downward,
placed by the side, and pressed inward against the chest, thereby
diminishing the size of the latter and producing _expiration_.

These movements should be repeated about fifteen times each minute for at
least two hours, provided no signs of animation show themselves.

381. The Marshall Hall Method. The patient should be placed face
downwards, the head resting on the forearm with a roll or pillow placed
under the chest; he should then be turned on his side, an assistant
supporting the head and keeping the mouth open; after an interval of two
or three seconds, the patient should again be placed face downward and
allowed to remain in this position the same length of time. This operation
should be repeated fifteen or sixteen times each minute, and continued
(unless the patient recovers) for at least two hours.

[Illustration: Fig. 166.--The Marshall Hall Method. (First position.)]

If, after using one of the above methods, evidence of recovery appears,
such as an occasional gasp or muscular movement, the efforts to produce
artificial respiration must not be discontinued, but kept up until
respiration is fully established. All wet clothing should then be removed,
the patient rubbed dry, and if possible placed in bed, where warmth and
warm drinks can be properly administered. A small amount of nourishment,
in the form of hot milk or beef tea, should be given, and the patient kept
quiet for two or three days.

[Illustration: Fig. 167.--The Marshall Hall Method. (Second position.)]

382. Sunstroke or Heatstroke. This serious accident, so far-reaching
oftentimes in its result, is due to an unnatural elevation of the bodily
temperature by exposure to the direct rays of the sun, or from the extreme
heat of close and confined rooms, as in the cook-rooms and laundries of
hotel basements, from overheated workshops, etc.

There is sudden loss of consciousness, with deep, labored breathing, an
intense burning heat of the skin, and a marked absence of sweat. The main
thing is to lower the temperature. Strip off the clothing; apply chopped
ice, wrapped in flannel to the head. Rub ice over the chest, and place
pieces under the armpits and at the sides. If there is no ice, use sheets
or cloths wet with cold water. The body may be stripped, and sprinkled
with ice-water from a common watering-pot.

If the skin is cold, moist, or clammy, the trouble is due to heat
exhaustion. Give plenty of fresh air, but apply no cold to the body. Apply
heat, and give hot drinks, like hot ginger tea. Sunstroke or heatstroke is
a dangerous affliction. It is often followed by serious and permanent
results. Persons who have once suffered in this way should carefully avoid
any risk in the future.




Chapter XIV.

In Sickness and in Health.



383. Arrangement of the Sick-room. This room, if possible, should be
on the quiet and sunny side of the house. Pure, fresh air, sunshine, and
freedom from noise and odor are almost indispensable. A fireplace as a
means of ventilation is invaluable. The bed should be so placed that the
air may get to it on all sides and the nurse move easily around it.
Screens should be placed, if necessary, so as to exclude superfluous light
and draughts.

The sick-room should be kept free from all odors which affect the sick
unpleasantly, as perfumery, highly scented soaps, and certain flowers.
Remove all useless ornaments and articles likely to collect dust, as
unnecessary pieces of furniture and heavy draperies. A clean floor, with a
few rugs to deaden the footsteps, is much better than a woolen carpet.
Rocking-chairs should be banished from the sick-room, as they are almost
sure to disturb the sick.

A daily supply of fresh flowers tends to brighten the room. Keep the
medicines close at hand, but all poisonous drugs should be kept carefully
by themselves and ordinarily under lock and key. A small table should be
placed at the bedside, and on it the bell, food tray, flowers and other
small things which promote the comfort of the patient.

The nurse should not sleep with the patient. Sofas and couches are not
commonly comfortable enough to secure needed rest. A cot bed is at once
convenient and inexpensive, and can be readily folded and put out of sight
in the daytime. It can also be used by the patient occasionally,
especially during convalescence.

384. Ventilation of the Sick-room. Proper ventilation is most
essential to the sick-room, but little provision is ordinarily made for so
important a matter. It is seldom that one of the windows cannot be let
down an inch or more at the top, a screen being arranged to avoid any
draught on the patient. Remove all odors by ventilation and not by
spraying perfumery, or burning pastilles, which merely conceal offensive
odors without purifying the air. During cold weather and in certain
diseases, the patient may be covered entirely with blankets and the
windows opened wide for a few minutes.

Avoid ventilation by means of doors, for the stale air of the house,
kitchen smells, and noises made by the occupants of the house, are apt to
reach the sick-room. The entire air of the room should be changed at least
two or three times a day, in addition to the introduction of a constant
supply of fresh air in small quantities.


385. Hints for the Sick-room. Always strive to look cheerful and
pleasant before the patient. Whatever may happen, do not appear to be
annoyed, discouraged, or despondent. Do your best to keep up the courage
of sick persons under all circumstances. In all things keep in constant
mind the comfort and ease of the patient.

Do not worry the sick with unnecessary questions, idle talk, or silly
gossip. It is cruel to whisper in the sick-room, for patients are always
annoyed by it. They are usually suspicious that something is wrong and
generally imagine that their condition has changed for the worse.

Symptoms of the disease should never be discussed before the patient,
especially if he is thought to be asleep. He may be only dozing, and any
such talk would then be gross cruelty. Loud talking must, of course, be
avoided. The directions of the physician must be rigidly carried out in
regard to visitors in the sick-room. This is always a matter of foremost
importance, for an hour or even a night of needed sleep and rest may be
lost from the untimely call of some thoughtless visitor. A competent
nurse, who has good sense and tact, should be able to relieve the family
of any embarrassment under such circumstances.

Do not ever allow a kerosene light with the flame turned down to remain in
the sick-room. Use the lamp with the flame carefully shaded, or in an
adjoining room, or better still, use a sperm candle for a night light.

Keep, so far as possible, the various bottles of medicine, spoons,
glasses, and so on in an adjoining room, rather than to make a formidable
array of them on a bureau or table near the sick-bed. A few simple things,
as an orange, a tiny bouquet, one or two playthings, or even a pretty
book, may well take their place.

The ideal bed is single, made of iron or brass, and provided with woven
wire springs and a hair mattress. Feather-beds are always objectionable in
the sick-room for many and obvious reasons. The proper making of a
sick-bed, with the forethought and skill demanded in certain diseases, is
of great importance and an art learned only after long experience. The
same principle obtains in all that concerns the lifting and the moving of
the sick.

Sick people take great comfort in the use of fresh linen and fresh
pillows. Two sets should be used, letting one be aired while the other is
in use. In making changes the fresh linen should be thoroughly aired and
warmed and everything in readiness before the patient is disturbed.


386. Rules for Sick-room. Do not deceive sick people. Tell what is
proper or safe to be told, promptly and plainly. If a physician is
employed, carry out his orders to the very letter, as long as he visits
you. Make on a slip of paper a note of his directions. Make a brief record
of exactly what to do, the precise time of giving medicines, etc. This
should always be done in serious cases, and by night watchers. Then there
is no guesswork. You have the record before you for easy reference. All
such things are valuable helps to the doctor.

Whatever must be said in the sick-room, say it openly and aloud. How often
a sudden turn in bed, or a quick glance of inquiry, shows that whispering
is doing harm! If the patient is in his right mind, answer his questions
plainly and squarely. It may not be best to tell all the truth, but
nothing is gained in trying to avoid a straightforward reply.

Noises that are liable to disturb the patient, in other parts of the house
than the sick-room, should be avoided. Sounds of a startling character,
especially those not easily explained, as the rattling or slamming of
distant blinds and doors, are always irritating to the sick.

Always attract the attention of a patient before addressing him, otherwise
he may be startled and a nervous spell be induced. The same hint applies
equally to leaning or sitting upon the sick-bed, or running against
furniture in moving about the sick-room.


387. Rest of Mind and Body. The great importance of rest for the sick
is not so generally recognized as its value warrants. If it is worry and
not work that breaks down the mental and physical health of the well, how
much more important is it that the minds and bodies of the sick should be
kept at rest, free from worry and excitement! Hence the skilled nurse does
her best to aid in restoring the sick to a condition of health by securing
for her patient complete rest both of mind and body. To this end, she
skillfully removes all minor causes of alarm, irritation, or worry. There
are numberless ways in which this may be done of which space does not
allow even mention. Details apparently trifling, as noiseless shoes,
quietness, wearing garments that do not rustle, use of small pillows of
different sizes, and countless other small things that make up the
refinement of modern nursing, play an important part in building up the
impaired tissues of the sick.


388. Care of Infectious and Contagious Diseases. There are certain
diseases which are known to be infectious and can be communicated from one
person to another, either by direct contact, through the medium of the
atmosphere, or otherwise.

Of the more prevalent infectious and contagious diseases are
_scarlet fever, diphtheria, erysipelas, measles_, and _typhoid fever_.

Considerations of health demand that a person suffering from any one of
these diseases should be thoroughly isolated from all other members of the
family. All that has been stated in regard to general nursing in previous
sections of this chapter, applies, of course, to nursing infectious and
contagious diseases. In addition to these certain special directions must
be always kept in mind.

Upon the nurse, or the person having the immediate charge of the patient,
rests the responsibility of preventing the spread of infectious diseases.
The importance must be fully understood of carrying out in every detail
the measures calculated to check the spread or compass the destruction of
the germs of disease.


389. Hints on Nursing Infectious and Contagious Diseases. Strip the
room of superfluous rugs, carpets, furniture, etc. Isolate two rooms, if
possible, and have these, if convenient, at the top of the house. Tack
sheets, wet in some proper disinfectant, to the outer frame of the
sick-room door. Boil these sheets every third day. In case of diseases to
which young folks are very susceptible, send the children away, if
possible, to other houses where there are no children.

Most scrupulous care should be taken in regard to cleanliness and neatness
in every detail. Old pieces of linen, cheese-cloth, paper napkins, should
be used wherever convenient or necessary and then at once burnt. All
soiled clothing that cannot well be burnt should be put to soak at once in
disinfectants, and afterward boiled apart from the family wash. Dishes and
all utensils should be kept scrupulously clean by frequent boiling. For
the bed and person old and worn articles of clothing that can be destroyed
should be worn so far as possible.

During convalescence, or when ready to leave isolation, the patient should
be thoroughly bathed in water properly disinfected, the hair and nails
especially being carefully treated.

Many details of the after treatment depend upon the special disease, as
the rubbing of the body with carbolized vaseline after scarlet fever, the
care of the eyes after measles, and other particulars of which space does
not admit mention here.



Poisons and Their Antidotes.


390. Poisons. A poison is a substance which, if taken into the system
in sufficient amounts, will cause serious trouble or death. For
convenience poisons may be divided into two classes, irritants and
narcotics.

The effects of irritant poisons are evident immediately after being
taken. They burn and corrode the skin or membrane or other parts with
which they come in contact. There are burning pains in the mouth, throat,
stomach, and abdomen, with nausea and vomiting. A certain amount of
faintness and shock is also present.

With narcotic poisoning, the symptoms come on more slowly. After a
time there is drowsiness, which gradually increases until there is a
profound sleep or stupor, from which the patient can be aroused only with
great difficulty. There are some substances which possess both the
irritant and narcotic properties and in which the symptoms are of a mixed
character.

391. Treatment of Poisoning. An antidote is a substance which will
either combine with a poison to render it harmless, or which will have a
directly opposite effect upon the body, thus neutralizing the effect of
the poison. Hence in treatment of poisoning the first thing to do, if you
know the special poison, is to give its antidote at once.

If the poison is unknown, and there is any delay in obtaining the
antidote, the first thing to do is to remove the poison from the stomach.
Therefore cause vomiting as quickly as possible. This may be done by an
emetic given as follows: Stir a tablespoonful of mustard or of common
salt in a glass of warm water and make the patient swallow the whole. It
will usually be vomited in a few moments. If mustard or salt is not at
hand, compel the patient to drink lukewarm water very freely until
vomiting occurs.

Vomiting may be hastened by thrusting the forefinger down the throat. Two
teaspoonfuls of the syrup of ipecac, or a heaping teaspoonful of powdered
ipecac taken in a cup of warm water, make an efficient emetic, especially
if followed with large amounts of warm water.

It is to be remembered that in some poisons, as certain acids and
alkalies, no emetic should be given. Again, for certain poisons (except in
case of arsenic) causing local irritation, but which also affect the
system at large, no emetic should be given.


392. Reference Table of Common Poisons; Prominent Symptoms; Antidotes and
Treatment. The common poisons with their leading symptoms, treatment,
and antidotes, may be conveniently arranged for easy reference in the form
of a table.

It is to be remembered, of course, that a complete mastery of the table of
poisons, as set forth on the two following pages, is really a physician's
business. At the same time, no one of fair education should neglect to
learn a few of the essential things to do in accidental or intentional
poisoning.


                  A Table of the More Common Poisons,

       With their prominent symptoms, antidotes, and treatment.

       Poison           Prominent Symptoms    Antidotes and Treatment

  _Strong Acids:_

   Muriatic,            Burning sensation in   _No emetic_ Saleratus;
   Nitric,              mouth, throat, and     chalk; soap; plaster from
   Sulphuric (vitriol), stomach; blisters      the wall; lime; magnesia;
   Oxalic.              about mouth; vomiting; baking soda (3 or 4
                        great weakness         teaspoonfuls in a glass of
                                               water).

  _Alkalies_:

   Caustic potash and  Burning sensation in   _No emetic_ Olive oil
     soda,             the parts; severe pain freely; lemon juice, vinegar;
   Ammonia,            in stomach; vomiting;  melted butter and vaseline;
   Lye,                difficulty in          thick cream.
   Pearlash,           swallowing; cold skin;
   Saltpeter.          weak pulse.

  _Arsenic:_

   Paris green,        Intense pains in       Vomit patient repeatedly,
   Rough on rats,      stomach and bowels;    give hydrated oxide of iron
   White arsenic,      thirst; vomiting,      with magnesia, usually kept
   Fowler's solution,  perhaps with blood;    by druggists for emergencies;
   Scheele's green.    cold and clammy skin.  follow with strong solution
                                              of common salt and water.

  _Other Metallic Poisons_:

   Blue vitriol,       Symptoms in general,   Emetic with lead; none with
   Copperas,           same as in arsenical   copper and iron; white of
   Green vitriol,      poisoning.  With lead  eggs in abundance with
   Sugar of lead,      and mercury there may  copper; with iron and lead
   Corrosive           be a metallic taste in give epsom salts freely;
   sublimate,          the mouth.             afterwards, oils, flour, and
   Bedbug poison.                             water. _No emetic with
                                              mercury;_ raw eggs;
                                              milk, or flour, and water.

  _Phosphorus from_

   Matches, rat         Pain in the stomach;  _Cause vomiting_.
   poisons,etc.         vomiting; purging;    Strong soapsuds;
                        general collapse.     magnesia in water.
                                              Never give oils.

  _Opium:_
   Morphine,            Sleepiness; dullness; _Cause vomiting_. Keep
   Laudanum,            stupor; "pin-hole"    patient awake by any means,
   Paregoric,           pupils; slow          especially by vigorous
   Dover's powder,      breathing; profuse    walking; give strong coffee
   Soothing syrups,     sweat.                freely; dash cold water on
   Cholera and diarrhœa                       face and chest.
   mixtures.


  _Carbolic Acid:_
   Creasote.           Severe pain in abdomen; _No emetic._ Milk or
                       odor of carbolic acid,  flour and water; white of
                       mucous membrane in      eggs.
                       around mouth white and
                       benumbed; cold and
                       clammy skin.

  _Aconite:_
   Wolfsbane           Numbness everywhere,    _Vomit patient freely._
   Monkshood           great weakness; cold    Stimulating drinks.
                       sweat.

  _Belladonna_
   Deadly Nightshade   Eyes bright, with pupil _Vomit patient freely._
   Atropia             enlarged; dry mouth and
                       throat.

  _Various Vegetable Poisons_
   Wild parsley,       Stupor, nausea, great   _Cause brisk vomiting_.
   Indian tobacco,     weakness and other      Stimulating drinks.
   Toadstools,         symptoms according to
   Tobacco plant,      the poison.
   Hemlock,
   Berries of the mountain ash,
   Bitter sweet etc.

393. Practical Points about Poisons. Poisons should never be kept in
the same place with medicines or other preparations used in the household.
They should always be put in some secure place under lock and key. Never
use internally or externally any part of the contents of any package or
bottle unless its exact nature is known. If there is the least doubt
about the substance, do not assume the least risk, but destroy it at
once. Many times the unknown contents of some bottle or package has
been carelessly taken and found to be poison.

Careless and stupid people often take, by mistake, with serious, and often
fatal, results, poisonous doses of carbolic acid, bed-bug poison,
horse-liniment, oxalic acid, and other poisons. A safe rule is to keep all
bottles and boxes containing poisonous substances securely bottled or
packed, and carefully labeled with the word POISON plainly written in
large letters across the label. Fasten the cork of a bottle containing
poison to the bottle itself with copper or iron wire twisted into a knot
at the top. This is an effective means of preventing any mistakes,
especially in the night.

This subject of poisons assumes nowadays great importance, as it is a
common custom to keep about stables, workshops, bathrooms, and living
rooms generally a more or less formidable array of germicides,
disinfectants, horse-liniments, insect-poisons, and other preparations of
a similar character. For the most part they contain poisonous
ingredients.



Bacteria.


394. Nature Of Bacteria. The word bacteria is the name applied to
very low forms of plant life of microscopic size. Thus, if hay be soaked
in water for some time, and a few drops of the liquid are examined under a
high power of the microscope, the water is found to be swarming with
various forms of living vegetable organisms, or bacteria. These
microscopic plants belong to the great fungus division, and consist of
many varieties, which may be roughly divided into groups, according as
they are spherical, rod-like, spiral, or otherwise in shape.

Each plant consists of a mass of protoplasm surrounded by an
ill-defined cell wall. The bacteria vary cably in size. Some of the
rod-shaped varieties are from 1/12,000 to 1/8,000 of an inch in length, and
average about 1/50,000 of an inch in diameter. It has been calculated that
a space of one cubic millimeter would contain 250,000,000 of these minute
organisms, and that they would not weigh more than a milligram.

[Illustration: Fig. 168.--Examples of Micro-Organisms called Bacteria.
(Drawn from photographs.)

  A, spheroidal bacteria (called _cocci_) in pairs;
  B, same kind of bacteria in chains;
  C, bacteria found in pus (grouped in masses like a bunch of grapes).
     [Bacteria in A, B, and C magnified about 1000 diameters].
  D, bacteria found in pus (tendency to grow in the form of chains).
     [Magnified about 500 diameters.]
]

Bacteria are propagated in a very simple manner. The parent cell divides
into two; these two into two others, and so on. The rapidity with which
these organisms multiply under favorable conditions, makes them, in some
cases, most dangerous enemies. It has been calculated that if all of the
organisms survived, one bacterium would lead to the production of several
billions of others in twenty-four hours.


395. The Struggle of Bacteria for Existence. Like all kinds of living
things, many species of bacteria are destroyed if exposed to boiling water
or steam, but seem able to endure prolonged cold, far below the
freezing-point. Thus ice from ponds and rivers may contain numerous germs
which resume their activity when the ice is melted. Typhoid fever germs
have been known to take an active and vigorous growth after they have been
kept for weeks exposed in ice to a temperature below zero.

The bacteria of consumption (bacillus tuberculosis) may retain their
vitality for months, and then the dried expectoration of the invalids may
become a source of danger to those who inhale air laden with such
impurities (sec. 220 and Fig. 94).

Like other living organisms, bacteria need warmth, moisture, and some
chemical compound which answers for food, in order to maintain the
phenomena of life. Some species grow only in contact with air, others need
no more oxygen than they can obtain in the fluid or semi-fluid which they
inhabit.


396. Importance of Bacteria in Nature. We might well ask why the
myriads of bacteria do not devastate the earth with their marvelous
rapidity of propagation. So indeed they might, were it not for the winds,
rains, melting snow and ice which scatter them far and wide, and destroy
them.

Again, as in countless other species of living organisms, bacteria are
subject to the relentless law which allows only the fittest to survive.
The bacteria of higher and more complex types devour those of a lower
type. Myriads perish in the digestive tract of man and other animals. The
excreta of some species of bacteria act as poison to destroy other
species.

It is true from the strictest scientific point of view that all living
things literally return to the dust whence they came. While living they
borrow a few elementary substances and arrange them in new combinations,
by aid of the energy given them by the sun, and after a time die and leave
behind all they had borrowed both of energy and matter.

Countless myriads of bacteria are silently at work changing dead animal
and vegetable matter into useful substances. In brief, bacteria prepare
food for all the rest of the world. Were they all destroyed, life upon
the earth would be impossible, for the elements necessary to maintain it
would be embalmed in the bodies of the dead.

397. Action of Bacteria. In certain well-known processes bacteria
have the power of bringing about decomposition of various kinds. Thus a
highly organized fungus, like the yeast plant, growing in the presence of
sugar, has the power of breaking down this complex body into simpler ones,
_viz._, alcohol and carbon dioxid.

In the same way, various forms of bacteria have the power of breaking down
complex bodies in their immediate neighborhood, the products depending
upon the substance, the kind of bacteria, and the conditions under which
they act. Thus the _bacteria lactis_ act upon the milk sugar present in
milk, and convert it into lactic acid, thus bringing about the souring of
milk.

[Illustration: Fig. 169.--Examples of Pathogenic Bacteria. (Drawn from
photographs.)

  A, spiral form of bacteria found in cholera (Magnified about 1000
     diameters)
  B, rod-shaped bacteria (called _bacilli_) from a culture obtained
     in _anthrax_ or malignant fustule of the face. Diseased hides
     carry this micro-organism, and thus may occasion disease among those
     who handle hides and wool. (Magnified about 1000 diameters)
]

Now, while most species of bacteria are harmless, some are the cause of
sickness and death when they gain admittance to the body under certain
conditions. These disease-producing bacteria (known as _pathogenic_), when
established in the blood and tissues of the body, bring about important
chemical changes, depending upon the species of bacteria, and also produce
a particular form of disease. The production of certain diseases by the
agency of bacteria has now been proved beyond all doubt. In yellow fever,
erysipelas, diphtheria, typhoid fever, consumption and other diseases, the
connection has been definitely established.

The evil results these germs of disease produce vary greatly in kind and
severity. Thus the bacteria of Asiatic cholera and diphtheria may destroy
life in a few hours, while those of consumption may take years to produce
a fatal result. Again, the bacteria may attack some particular organ, or
group of organs, and produce mostly local symptoms. Thus in a boil there
is painful swelling due to the local effect of the bacteria, with slight
general disturbance.

398. The Battle against Bacteria. When we reflect upon the terrible
ravages made by infectious diseases, and all their attendant evils for
these many years, we can the better appreciate the work done of late years
by tireless scientists in their efforts to modify the activity of
disease-producing bacteria. It is now possible to cultivate certain
pathogenic bacteria, and by modifying the conditions under which they are
grown, to destroy their violence.

In brief, science has taught us, within certain limitations, how to
change the virulent germs of a few diseases into harmless microbes.

399. Alcoholic Fermentation and Bacteria. Men of the lowest, as well
as of the highest, type of civilization have always known that when the
sugary juice of any fruit is left to itself for a time, at a moderately
warm temperature, a change takes place under certain conditions, and the
result is a liquid which, when drank, produces a pronounced effect upon
the body. In brief, man has long known how to make for himself alcoholic
beverages, by means of which he may become intoxicated with their
poisonous ingredients.

Whether it is a degraded South Sea Islander making a crude intoxicant from
a sugary plant, a Japanese preparing his favorite alcoholic beverage from
the fermentation of rice by means of a fungus plant grown for the purpose,
a farmer of this country making cider from fermenting apple juice, or a
French expert manufacturing costly champagne by a complicated process,
the outcome and the intent are one and the same. The essential thing is
to produce an alcoholic beverage which will have a marked physiological
effect. This effect is poisonous, and is due solely to the
alcoholic ingredient, without which man would have little or no use
for the otherwise harmless liquid.

While the practical process of making some form of alcoholic beverage has
been understood for these many centuries, the real reason of this
remarkable change in a wholesome fruit juice was not known until revealed
by recent progress in chemistry, and by the use of the microscope. We know
now that the change is due to fermentation, brought about from the
influence, and by the action, of bacteria (sec. 125).

In other words, fermentation is the result of the growth of low form of
vegetable life known as an organised ferment. The ferment, whether it
be the commonly used brewer's yeast, or any other species of alcoholic
ferment, has the power to decompose or break down a large part of the
sugar present in the liquid into alcohol, which remains as a poison,
and _carbon dioxid_, which escapes more or less completely.

Thus man, ever prone to do evil, was once obliged, in his ignorance, to
make his alcoholic drinks in the crudest manner; but now he has forced
into his service the latest discoveries in science, more especially in
bacteriology, that he may manufacture more scientifically and more
economically alcoholic beverages of all sorts and kinds, and distribute
them broadcast all over God's earth for the physical and moral ruin of the
people.



Disinfectants.


400. Disinfectants, Antiseptics, and Deodorants. The word
disinfectant is synonymous with the term _bactericide_ or _germicide_. A
disinfectant is a substance which destroys infectious material. An
antiseptic is an agent which may hinder the growth, but does not
destroy the vitality, of bacteria. A deodorant is not necessarily a
disinfectant, or even an antiseptic, but refers to a substance that
destroys or masks offensive odors.

401. Air and Water as Disinfectants. Nature has provided for our
protection two most efficient means of disinfection,--pure air (sec.
218) and pure water (sec. 119). The air of crowded rooms contains
large quantities of bacteria, whereas in pure air there are comparatively
few, especially after rain, which carries them to the earth. Living
micro-organisms have never been detected in breezes coming from the sea,
but in those blowing out from the shore large numbers may be found.

In water tainted with organic matter putrefactive bacteria will flourish,
whereas pure water is fatal to their existence. Surface water, because it
comes from that part of the soil where bacteria are most active, and where
there is most organic matter, generally contains great quantities of these
organisms. In the deeper strata of the soil there is practically no
decomposition of organic matter going on, hence, water taken from deep
sources is comparatively free from bacteria. For this reason, deep well
water is greatly to be preferred for drinking purposes to that from
surface wells.


402. Disinfectants. It is evident that air and water are not always
sufficient to secure disinfection, and this must be accomplished by other
means. The destruction of infected material by fire is, of course, a sure
but costly means of disinfection. Dry heat, steam, and boiling water are
valuable disinfectants and do not injure most fabrics. These agents are
generally used in combination with various chemical disinfectants.

Certain chemical agents that are capable of destroying micro-organisms
and their spores have come, of late years, into general use. A form of
mercury, called _corrosive sublimate_, is a most efficacious and powerful
germicide, but is exceedingly poisonous and can be bought only under
restrictions.[54] _Carbolic acid, chloride of lime, permanganate of
potash_, and various other preparations made from zinc, iron, and
petroleum, are the chemical disinfectants most commonly and successfully
used at the present time. There are also numerous varieties of commercial
disinfectants now in popular use, such as Platt's chlorides,
bromo-chloral, sanitas, etc., which have proved efficient germicides.



Instructions for the Management of Contagious Diseases.


The following instructions for the management of contagious diseases were
prepared for the National Board of Health by an able corps of scientists
and experienced physicians.

403. Instructions for Disinfection. Disinfection is the destruction
of the poisons of infectious and contagious diseases. Deodorizers, or
substances which destroy smells, are not necessarily disinfectants, and
disinfectants do not necessarily have an odor. Disinfection cannot
compensate for want of cleanliness nor of ventilation.

404. Disinfectants to be Employed. 1. Roll sulphur (brimstone); for
fumigation.

2. Sulphate of iron (copperas) dissolved in water in the proportion of one
and a half pounds to the gallon; for soil, sewers, etc.

    [NOTE. A most useful little manual to consult in connection with this
    chapter is the _Hand-Book of Sanitary Information_, written by Roger
    S. Tracy, Sanitary Inspector of the New York City Health Department.
    Price, 50 cents.]

3. Sulphate of zinc and common salt, dissolved together in water in the
proportion of four ounces sulphate and two ounces salt to the gallon; for
clothing, bed-linen, etc.


405. How to Use Disinfectants. 1. _In the sick-room._ The most
available agents are fresh air and cleanliness. The clothing,
towels, bed-linen, etc., should, on removal from the patient, and before
they are taken from the room, be placed in a pail or tub of the zinc
solution, boiling-hot, if possible.

All discharges should either be received in vessels containing copperas
solution, or, when this is impracticable, should be immediately covered
with copperas solution. All vessels used about the patient should be
cleansed with the same solution.

Unnecessary furniture, especially that which is stuffed, carpets, and
hangings, should, when possible, be removed from the room at the outset;
otherwise they should remain for subsequent fumigation and treatment.

2. _Fumigation_. Fumigation with sulphur is the only practicable method
for disinfecting the house. For this purpose, the rooms to be disinfected
must be vacated. Heavy clothing, blankets, bedding, and other articles
which cannot be treated with zinc solution, should be opened and exposed
during fumigation, as directed below. Close the rooms as tightly as
possible, place the sulphur in iron pans supported upon bricks placed in
washtubs containing a little water, set it on fire by hot coals or with
the aid of a spoonful of alcohol, and allow the room to remain closed for
twenty-four hours. For a room about ten feet square, at least two pounds
of sulphur should be used; for larger rooms, proportionally increased
quantities.[55]

3. _Premises_. Cellars, yards, stables, gutters, privies, cesspools,
water-closets, drains, sewers, etc., should be frequently and liberally
treated with copperas solution. The copperas solution is easily prepared
by hanging a basket containing about sixty pounds of copperas in a barrel
of water.[56]

4. _Body and bed clothing, etc_. It is best to burn all articles which
have been in contact with persons sick with contagious or infectious
diseases. Articles too valuable to be destroyed should be treated as
follows:

_(a)_ Cotton, linen, flannels, blankets, etc., should be treated with the
boiling-hot zinc solution; introduce piece by piece, secure thorough
wetting, and boil for at least half an hour.

_(b)_ Heavy woolen clothing, silks, furs, stuffed bed-covers, beds, and
other articles which cannot be treated with the zinc solution, should be
hung in the room during fumigation, their surfaces thoroughly exposed and
pockets turned inside out. Afterward they should be hung in the open air,
beaten, and shaken. Pillows, beds, stuffed mattresses, upholstered
furniture, etc., should be cut open, the contents spread out and
thoroughly fumigated. Carpets are best fumigated on the floor, but should
afterward be removed to the open air and thoroughly beaten.


Books for Collateral Study. Among the many works which may be
consulted with profit, the following are recommended as among those most
useful: Parkes _Elements of Health_; Canfield's _Hygiene of the
Sick-Room;_ Coplin & Bevan's _Practical Hygiene;_ Lincoln's _School
Hygiene_; Edward Smith's _Health_; McSherrys _Health; American Health
Primers_ (12 little volumes, edited by Dr. Keen of Philadelphia);
Reynold's _Primer of Health_; Corfield's _Health_; Appleton's _Health
Primers;_ Clara S. Weeks' _Nursing_; Church's _Food_; Yeo's _Food in Health
and Disease;_ Hampton's _Nursing, its Principles and Practice_; Price's
_Nurses and Nursing;_ Cullinworth's _Manual of Nursing_; Wise's _Text-Book
of Nursing_ (2 vols.); and Humphrey's _Manual of Nursing_.




Chapter XV.

Experimental Work in Physiology.



406. The Limitations of Experimental Work in Physiology in Schools.
Unlike other branches of science taught in the schools from the
experimental point of view, the study of physiology has its limitations.
The scope and range of such experiments is necessarily extremely limited
compared with what may be done with the costly and elaborate apparatus of
the medical laboratory. Again, the foundation of physiology rests upon
systematic and painstaking dissection of the dead human body and the lower
animals, which mode of study very properly is not permitted in ordinary
school work. Experiments upon the living human body and the lower animals,
now so generally depended upon in our medical and more advanced scientific
schools, for obvious reasons can be performed only in a crude and quite
superficial manner in secondary schools.

Hence in the study of physiology in schools many things must be taken for
granted. The observation and experience of medical men, and the
experiments of the physiologist in his laboratory must be depended upon
for data which cannot be well obtained at first hand by young students.

407. Value of Experiments in Physiology in Secondary Schools. While
circumstances and regard for certain proprieties of social life forbid the
use of a range of experiments, in anatomy and physiology, such as are
permitted in other branches of science in secondary schools, it by no
means follows that we are shut out altogether from this most important and
interesting part of the study. However simple and crude the apparatus, the
skillful and enthusiastic teacher has at his command a wide series of
materials which can be profitably utilized for experimental instruction.
As every experienced teacher knows, pupils gain a far better knowledge,
and keep up a livelier interest in any branch of science, if they see with
their own eyes and do with their own hands that which serves to illuminate
and illustrate the subject-matter.

    [NOTE. For additional suggestions and practical helps on the subject
    of experimental work in physiology the reader is referred to
    Blaisdell's _How to Teach Physiology_, a handbook for teachers. A copy
    of this pamphlet will be sent postpaid to any address by the
    publishers of this book on receipt of ten cents.]

The experimental method of instruction rivets the attention and arouses
and keeps alive the interest of the young student; in fact, it is the
only true method of cultivating a scientific habit of study[57]. The
subject-matter as set forth on the printed pages of this book should be
mastered, of course, but at the same time the topics discussed should be
illuminated and made more interesting and practical by a well-arranged
series of experiments, a goodly show of specimens, and a certain amount of
microscopical work.


408. The Question of Apparatus. The author well understands from
personal experience the many practical difficulties in the way of
providing a suitable amount of apparatus for classroom use. If there are
ample funds for this purpose, there need be no excuse or delay in
providing all that is necessary from dealers in apparatus in the larger
towns, from the drug store, markets, and elsewhere. In schools where both
the funds and the time for such purposes are limited, the zeal and
ingenuity of teachers and students are often put to a severe test.
Fortunately a very little money and a great deal of ingenuity and patience
will do apparent wonders towards providing a working supply of apparatus.

It will be noticed that many of the experiments in the preceding chapters
of this book can be performed with very simple, and often a crude and
home-made sort of apparatus. This plan has been rigidly followed by the
author, first, because he fully realizes the limitations and restrictions
of the subject; and secondly, because he wishes to emphasize the fact that
expensive and complicated apparatus is by no means necessary to illustrate
the great principles of anatomy and physiology.

409. Use of the Microscope. To do thorough and satisfactory work in
physiology in our higher schools a compound microscope is almost
indispensable. Inasmuch as many of our best secondary schools are equipped
with one or more microscopes for use in other studies, notably botany, it
is much less difficult than it was a few years ago to obtain this
important help for the classes in physiology.

[Illustration: Fig. 170.--A Compound Microscope]

For elementary class work a moderate-priced, but well-made and strong,
instrument should be provided. If the school does not own a microscope,
the loan of an instrument should be obtained for at least a few weeks from
some person in the neighborhood.

The appearance of the various structures and tissues of the human body as
revealed by the microscope possesses a curious fascination for every
observer, especially for young people. No one ever forgets the first look
at a drop of blood, or the circulation of blood in a frog's foot as shown
by the microscope.

    [NOTE. For detailed suggestions in regard to the manipulation and use
    of the microscope the student is referred to any of the standard works
    on the subject. The catalogues of scientific-instrument makers of our
    larger cities generally furnish a list of the requisite materials or
    handbooks which describe the use of the various microscopes of
    standard make.

    The author is indebted to Bergen's _Elements of Botany_ for the
    following information concerning the different firms which deal in
    microscopes. "Several of the German makers furnish excellent
    instruments for use in such a course as that here outlined. The author
    is most familar with the Leitz microscopes, which are furnished by Wm.
    Krafft, 411 West 59th St., New York city, or by the Franklin
    Educational Co., 15 and 17 Harcourt St., Boston. The Leitz Stand, No.
    IV., can be furnished duty free (for schools only), with objectives 1,
    3, and 5, eye-pieces I. and III., for $24.50. If several instruments
    are being provided, it would be well to have part of them equipped
    with objectives 3 and 7, and eye-pieces I. and III.

    "The American manufacturers, Bausch & Lomb Optical Company, Rochester,
    N.Y., and No. 130 Fulton St., New York city, have this year produced a
    microscope of the Continental type which is especially designed to
    meet the requirements of the secondary schools for an instrument with
    rack and pinion coarse adjustment and serviceable fine adjustment, at
    a low price. They furnish this new stand, 'AAB,' to schools and
    teachers at 'duty-free' rates, the prices being for the stand with two
    eye-pieces (any desired power), ⅔-inch and ¼-inch objectives,
    $25.60, or with 2-inch, ⅔-inch, and ¼-inch objectives, and two
    eye-pieces, $29.20. Stand 'A,' the same stand as the 'AAB,' without
    joint and with sliding tube coarse adjustment (as in the Leitz Stand
    IV.), and with three eye-pieces and ⅔-inch and ¼-inch objectives,
    is furnished for $20.40. Stand 'A,' with two eye-pieces, ⅔-inch and
    ⅙-inch objectives, $20.40."]

410. The Use of the Skeleton and Manikin. The study of the bones by
the help of a skeleton is almost a necessity. To this intent, schools of a
higher grade should be provided both with a skeleton and a
manikin. If the former is not owned by the school, oftentimes a loan
of one can be secured of some medical man in the vicinity. Separate bones
will also prove useful. In fact, there is no other way to study properly
the structure and use of the bones and joints than by the bones
themselves. A good manikin is also equally serviceable, although not so
commonly provided for schools on account of its cost.

411. The Question of Vivisection and Dissection. There should be no
question at all concerning vivisection. _In no shape or form should
it be allowed in any grade of our schools._ Nor is there any need of much
dissection in the grammar-school grades. A few simple dissections to
be performed with fresh beef-joints, tendons of turkey legs, and so on,
will never engender cruel or brutal feelings toward living things. In the
lower grades a discreet teacher will rarely advise his pupils to dissect a
dead cat, dog, frog, or any other animal. Instead of actual dissection,
the pupils should examine specimens or certain parts previously dissected
by the teacher,--as the muscles and tendons of a sheep, the heart of an
ox, the eye of a codfish, and so on. Even under these restrictions the
teacher should not use the knife or scissors before the class to open up
any part of the specimen. In brief, avoid everything that can possibly
arouse any cruel or brutal feeling on the part of young students.

In the higher schools, in normal and other training schools, different
conditions prevail. Never allow vivisection in any form whatever, either
in school or at home. Under the most exact restrictions students in these
schools may be taught to make a few simple dissections.

Most teachers will find, however, even in schools of a higher grade, that
the whole subject is fraught with many difficulties. It will not require
much oftentimes to provoke in a community a deal of unjust criticism. A
teacher's good sense and discretion are often put to a severe test.



Additional Experiments.


To the somewhat extended list of experiments as described in the preceding
chapters a few more are herewith presented which may be used as
opportunity allows to supplement those already given.

  Experiment 193. _To examine white fibrous tissue._ Snip off a very
  minute portion from the muscle of a rabbit, or any small animal recently
  dead. Tease the specimen with needles, mount in salt solution and
  examine under a high power. Note the course and characters of the
  fibers.

  Experiment 194. _To examine elastic tissue._ Tease out a small
  piece of ligament from a rabbit's leg in salt solution; mount in the
  same, and examine as before. Note the curled elastic fibers.

  Experiment 195. _To examine areolar tissue._ Gently tease apart
  some muscular fibers, noting that they are attached to each other by
  connective tissue. Remove a little of this tissue to a slide and examine
  as before. Examine the matrix with curled elastic fiber mixed with
  straight white fibers.

  Experiment 196. _To examine adipose tissue._ Take a bit of fat from
  the mesentery of a rabbit. Tease the specimen in salt solution and mount
  in the same. Note the fat cells lying in a vascular meshwork.

  Experiment 197. _To examine connective tissues._ Take a very small
  portion from one of the tendons of a rabbit, or any animal recently
  dead; place upon a glass slide with a drop of salt solution; tease it
  apart with needles, cover with thin glass and examine with microscope.
  The fine wavy filaments will be seen. Allow a drop of dilute acetic acid
  to run under the cover glass; the filaments will swell and become
  transparent.

  Experiment 198. Tease out a small piece of ligament from the
  rabbit's leg in salt solution; mount in the same, and examine under a
  high power. Note the curled elastic fibers.

  Experiment 199. _A crude experiment to represent the way in which a
  person's neck is broken._ Bring the ends of the left thumb and the left
  second finger together in the form of a ring. Place a piece of a wooden
  toothpick across it from the middle of the finger to the middle of the
  thumb. Put the right forefinger of the other hand up through the front
  part to represent the odontoid process of the axis, and place some
  absorbent cotton through the other part to represent the spinal cord.
  Push backwards with the forefinger with just enough force to break the
  toothpick and drive its fragments on to the cotton.

  Experiment 200. _To illustrate how the pulse-wave is transmitted
  along an artery._ Use the same apparatus as in Experiment 106, p. 201.
  Take several thin, narrow strips of pine wood. Make little flags by
  fastening a small piece of tissue paper on one end of a wooden
  toothpick. Wedge the other end of the toothpick into one end of the
  strips of pine wood. Use these strips like levers by placing them across
  the long rubber tube at different points. Let each lever compress the
  tube a little by weighting one end of it with a blackboard eraser or
  book of convenient size.

  As the pulse-wave passes along under the levers they will be
  successively raised, causing a slight movement of the tissue-paper
  flags.

  Experiment 201. _The dissection of a sheep's heart._ Get a sheep's
  heart with the lungs attached, as the position of the heart will be
  better understood. Let the lungs be laid upon a dish so that the heart
  is uppermost, with its apex turned toward the observer.

  The line of fat which extends from the upper and left side of the heart
  downwards and across towards the right side, indicates the division
  between the right and left ventricles.

  Examine the large vessels, and, by reference to the text and
  illustrations, make quite certain which are the _aorta_, the _pulmonary
  artery_, the _superior_ and _inferior venæ cavæ_, and the _pulmonary
  veins_.

  Tie variously colored yarns to the vessels, so that they may be
  distinguished when separated from the surrounding parts.

  Having separated the heart from the lungs, cut out a portion of the wall
  of the _right ventricle_ towards its lower part, so as to lay the cavity
  open. Gradually enlarge the opening until the _chordæ tendineæ_ and the
  flaps of the _tricuspid valve_ are seen. Continue to lay open the
  ventricle towards the pulmonary artery until the _semilunar valves_ come
  into view.

  The pulmonary artery may now be opened from above so as to display the
  upper surfaces of the semilunar valves. Remove part of the wall of the
  right auricle, and examine the right auriculo-ventricular opening.

  The heart may now be turned over, and the _left ventricle_ laid open in
  a similar manner. Notice that the mitral valve has only two flaps. The
  form of the valves is better seen if they are placed under water, and
  allowed to float out. Observe that the walls of the _left_ ventricle are
  much thicker than those of the _right_.

  Open the left auricle, and notice the entrance of the _pulmonary veins_,
  and the passage into the ventricle.

  The ventricular cavity should now be opened up as far as the aorta, and
  the semilunar valves examined. Cut open the aorta, and notice the form
  of the _semilunar valves_.

  Experiment 202. _To show the circulation in a frog's foot_ (see
  Fig. 78, p. 192). In order to see the blood circulating in the membrane
  of a frog's foot it is necessary to firmly hold the frog. For this
  purpose obtain a piece of soft wood, about six inches long and three
  wide, and half an inch thick. At about two inches from one end of this,
  cut a hole three-quarters of an inch in diameter and cover it with a
  piece of glass, which should be let into the wood, so as to be level
  with the surface. Then tie up the frog in a wet cloth, leaving one of
  the hind legs outside. Next, fasten a piece of cotton to each of the two
  longest toes, but not too tightly, or the circulation will be stopped
  and you may hurt the frog.

  Tie the frog upon the board in such a way that the foot will just come
  over the glass in the aperture. Pull carefully the pieces of cotton tied
  to the toes, so as to spread out the membrane between them over the
  glass. Fasten the threads by drawing them into notches cut in the sides
  of the board. The board should now be fixed by elastic bands, or by any
  other convenient means, upon the stage of the microscope, so as to bring
  the membrane of the foot under the object glass.

  The flow of blood thus shown is indeed a wonderful sight, and never to
  be forgotten. The membrane should be occasionally moistened with water.

  Care should be taken not to occasion any pain to the frog.

  Experiment 203. _To illustrate the mechanics of respiration_[58]
  (see Experiment 122, p. 234). "In a large lamp-chimney, the top of which
  is closed by a tightly fitting perforated cork (A), is arranged a pair
  of rubber bags (C) which are attached to a Y connecting tube (B), to be
  had of any dealer in chemical apparatus or which can be made by a
  teacher having a bunsen burner and a little practice in the manipulation
  of glass (Fig. 171). From the center of the cork is attached a rubber
  band by means of a staple driven through the cork, the other end of
  which (D) is attached to the center of a disk of rubber (E) such as
  dentists use. This disk is held to the edge of the chimney by a wide
  elastic band (F). There is a string (G) also attached to the center of
  the rubber disk by means of which the diaphragm may be lowered.

  [Illustration: Fig. 171.]

  Such is a description of the essentials of the model. The difficulties
  encountered in its construction are few and easily overcome. In the
  first place, the cork must be air-tight, and it is best made so by
  pouring a little melted paraffin over it, care being taken not to close
  the tube. The rubber bags were taken from toy balloon-whistles.

  In the construction of the diaphragm, it is to be remembered that it
  also must be air-tight, and in order to resemble the human diaphragm, it
  must have a conical appearance when at rest. In order to avoid making
  any holes in the rubber, the two attachments (one of the rubber band,
  and the other of the string) were made in this wise: the rubber was
  stretched over a button having an eye, then under the button was placed
  a smaller ring from an old umbrella; to this ring was attached the
  rubber band, and to the eye of the button was fastened the operating
  string. When not in use the diaphragm should be taken off to relieve the
  strain on the rubber band."

  Experiment 204. _To illustrate the action of the intercostal
  muscles_ (see sec. 210). The action of the intercostal muscles is not at
  first easy to understand; but it will be readily comprehended by
  reference to a model such as that represented in Fig. 172. This maybe
  easily made by the student himself with four laths of wood, fastened
  together at the corners, A, B, C, D, with pins or small screws, so as
  to be movable. At the points E, F, G, H, pins are placed, to which
  elastic bands may be attached (A). B D represents the vertebral column;
  A C, the sternum; and A B and C D, the ribs. The elastic band F G
  represents the _external_ intercostal muscles, and E H, the _internal_
  intercostals.

  [Illustration: Fig. 172.]

  If now the elastic band E H be removed, the remaining band, F G, will
  tend to bring the two points to which it is attached, nearer together,
  and the result will be that the bars A B and C D will be drawn upwards
  (B), that is, in the same direction as the ribs in the act of
  _inspiration_. When the elastic band E H is allowed to exert its force,
  the opposite effect will be produced (C); in this case representing the
  position of the ribs in an act of _expiration_.

  Experiment 205. Pin a round piece of bright red paper (large as a
  dinner-plate) to a white wall, with a single pin. Fasten a long piece of
  thread to it, so it can be pulled down in a moment. Gaze steadily at the
  red paper. Have it removed while looking at it intently, and a greenish
  spot takes its place.

  Experiment 206. Lay on different parts of the skin a small, square
  piece of paper with a small central hole in it. Let the person close his
  eyes, while another person gently touches the uncovered piece of skin
  with cotton wool, or brings near it a hot body. In each case ask the
  observed person to distinguish between them. He will always succeed on
  the volar side of the hand, but occasionally fail on the dorsal surface
  of the hand, the extensor surface of the arm, and very frequently on the
  skin of the back.

  Experiment 207. _Wheatstone's fluttering hearts_. Make a drawing of
  a red heart on a bright blue ground. In a dark room lighted by a candle
  hold the picture below the level of the eyes and give it a gentle
  to-and-fro motion. On continuing to look at the heart it will appear to
  move or flutter over the blue background.

  Experiment 208. At a distance of six inches from the eyes hold a
  veil or thin gauze in front of some printed matter placed at a distance
  of about two feet. Close one eye, and with the other we soon see either
  the letters distinctly or the fine threads of the veil, but we cannot
  see both equally distinct at the same time. The eye, therefore, can form
  a distinct image of a near or distant object, but not of both at the
  same time; hence the necessity for accommodation.

  Experiment 209. Place a person in front of a bright light opposite
  a window, and let him look at the light; or place one's self opposite a
  well-illuminated mirror. Close one eye with the hand and observe the
  diameter of the other pupil. Then suddenly remove the hand from the
  closed eye: light falls upon it; at the same time the pupil of the other
  eye contracts.

  Experiment 210. _To illustrate the blind spot. Marriott's
  experiment_. On a white card make a cross and a large dot, either black
  or colored. Hold the card vertically about ten inches from the right
  eye, the left being closed. Look steadily at the cross with the right
  eye, when both the cross and the circle will be seen. Gradually approach
  the card toward the eye, keeping the axis of vision fixed on the cross.
  At a certain distance the circle will disappear, i.e., when its image
  falls on the entrance of the optic nerve. On bringing the card nearer,
  the circle reappears, the cross, of course, being visible all the time
  (see Experiment 180, p. 355).

  Experiment 211. _To map out the field of vision_. A crude method is
  to place the person with his back to a window, ask him to close one eye,
  stand in front of him about two feet distant, hold up the forefingers of
  both hands in front of and in the plane of your own face. Ask the person
  to look steadily at your nose, and as he does so observe to what extent
  the fingers can be separated horizontally, vertically, and in oblique
  directions before they disappear from his field of vision.

  Experiment 212. _To illustrate imperfect judgment of distance_.
  Close one eye and hold the left forefinger vertically in front of the
  other eye, at arm's length, and try to strike it with the right
  forefinger.

  On the first trial one will probably fall short of the mark, and fail to
  touch it. Close one eye, and rapidly try to dip a pen into an inkstand,
  or put a finger into the mouth of a bottle placed at a convenient
  distance. In both cases one will not succeed at first.

  In these cases one loses the impressions produced by the convergence of
  the optic axes, which are important factors in judging of distance.

  Experiment 213. Hold a pencil vertically about twelve inches from
  the nose, fix it with both eyes, close the left eye, and then hold the
  right index finger vertically, so as to cover the lower part of the
  pencil. With a sudden move, try to strike the pencil with the finger. In
  every case one misses the pencil and sweeps to the right of it.

  Experiment 214. _To illustrate imperfect judgment of direction_. As
  the retina is spherical, a line beyond a certain length when looked at
  always shows an appreciable curvature.

  Hold a straight edge just below the level of the eyes. Its upper margin
  shows a slight concavity.



Surface Anatomy and Landmarks.


In all of our leading medical colleges the students are carefully and
thoroughly drilled on a study of certain persons selected as models. The
object is to master by observation and manipulation the details of what is
known as surface anatomy and landmarks. Now while detailed work of this
kind is not necessary in secondary schools, yet a limited amount of study
along these lines is deeply interesting and profitable. The habit of
looking at the living body with anatomical eyes and with eyes at our
fingers' ends, during the course in physiology, cannot be too highly
estimated.

In elementary work it is only fair to state that many points of surface
anatomy and many of the landmarks cannot always be defined or located with
precision. A great deal in this direction can, however, be done in higher
schools with ingenuity, patience, and a due regard for the feelings of all
concerned. Students should be taught to examine their own bodies for this
purpose. Two friends may thus work together, each serving as a "model" to
the other.

To the following syllabus may be added such other similar exercises as
ingenuity may suggest or time permit.




Syllabus.



I. Bony Landmarks.


1. The _occipital protuberance_ can be distinctly felt at the back of
the head. This is always the thickest part (often three-quarters of an
inch or more) of the skull-cap, and is more prominent in some than in
others. The thinnest part is over the temples, where it may be almost as
thin as parchment.

2. The working of the _condyle of the lower jaw_ vertically and from
side to side can be distinctly felt and seen in front of the ear. When the
mouth is opened wide, the condyle advances out of the glenoid cavity, and
returns to its socket when the mouth is shut. In front of the ear, lies
the zygoma, one of the most marked and important landmarks to the touch,
and in lean persons to the eye.

3. The sliding movement of the _scapula_ on the chest can be properly
understood only on the living subject. It can move not only upwards and
downwards, as in shrugging the shoulders, backwards and forwards, as in
throwing back the shoulders, but it has a rotary movement round a movable
center. This rotation is seen while the arm is being raised from the
horizontal to the vertical position, and is effected by the cooperation of
the trapezius with the serratus magnus muscles.

4. The _patella_, or knee-pan, the _two condyles of the tibia_, the
_tubercle on the tibia_ for the attachment of the ligament of the patella,
and the _head of the fibula_ are the chief bony landmarks of the knee. The
head of the fibula lies at the outer and back part of the tibia. In
extension of the knee, the patella is nearly all above the condyles. The
inner border of the patella is thicker and more prominent than the outer,
which slopes down toward its condyle.

5. The short, front edge of the _tibia_, called the "shin," and the
broad, flat, subcutaneous surface of the bone can be felt all the way
down. The inner edge can be felt, but not so plainly.

6. The head of the _fibula_ is a good landmark on the outer side of
the leg, about one inch below the top of the tibia. Note that it is placed
well back, and that it forms no part of the knee joint, and takes no share
in supporting the weight. The shaft of the fibula arches backwards and is
buried deep among the muscles, except at the lower fourth, which can be
distinctly felt.

7. The _malleoli_ form the great landmarks of the ankle. The outer
malleolus descends lower than the inner. The inner malleolus advances more
to the front and does not descend so low as the outer.

8. The line of the _clavicle_, or collar bone, and the projection of
the joint at either end of it can always be felt. Its direction is not
perfectly horizontal, but slightly inclined downwards. We can distinctly
feel the _spine_ of the scapula and its highest point, the _acromion_.

9. Projecting beyond the acromion (the arm hanging by the side), we
can feel, through the fibers of the _deltoid_, the upper part of the
humerus. It distinctly moves under the hand when the arm is rotated. It is
not the head of the bone which is felt, but its prominences (the
tuberosities). The greater, externally; the lesser in front.

10. The _tuberosities of the humerus_ form the convexity of the
shoulder. When the arm is raised, the convexity disappears,--there is a
slight depression in its place. The head of the bone can be felt by
pressing the fingers high up in the axilla.

11. The _humerus_ ends at the elbow in two bony prominences (internal
and external condyles). The internal is more prominent. We can always feel
the _olecranon_. Between this bony projection of the ulna and the internal
condyle is a deep depression along which runs the ulna nerve (commonly
called the "funny" or "crazy" bone).

12. Turn the hand over with the palm upwards, and the edge of the
_ulna_ can be felt from the olecranon to the prominent knob (styloid
process) at the wrist. Turn the forearm over with the palm down, and the
head of the ulna can be plainly felt and seen projecting at the back of
the wrist.

13. The upper half of the _radius_ cannot be felt because it is so
covered by muscles; the lower half is more accessible to the touch.

14. The three rows of projections called the "knuckles" are formed by
the proximal bones of the several joints. Thus the first row is formed by
the ends of the metacarpals, the second by the ends of the first
phalanges, and the third by the ends of the second phalanges. That is, in
all cases the line of the joints is a little in advance of the knuckles
and nearer the ends of the fingers.



II. Muscular Landmarks.


1. The position of the _sterno-mastoid_ muscle as an important and
interesting landmark of the neck has already been described (p. 70).

2. If the left arm be raised to a vertical position and dropped to a
horizontal, somewhat vigorously, the tapering ends of the _pectoralis
major_ and the tendons of the _biceps_ and _deltoid_ may be felt by
pressing the parts in the axilla between the fingers and thumb of the
right hand.

3. The appearance of the _biceps_ as a landmark of the arm has
already been described (p. 70). The action of its antagonist, the
_triceps_, may be studied in the same manner.

4. The _sartorius_ is one of the fleshy landmarks of the thigh, as
the biceps is of the arm, and the sterno-cleido-mastoid of the neck. Its
direction and borders may be easily traced by raising the leg,--a movement
which puts the muscle in action.

5. If the model be directed to stand on tiptoe, both of the large
muscles of the calf, the _gastrocnemius_ and _soleus_, can be
distinguished.

6. Direct the model, while sitting upright, to cross one leg over the
other, using his utmost strength. The great muscles of the inner thigh are
fully contracted. Note the force required to pull the legs to the ordinary
position.

7. With the model lying in a horizontal position with both legs
firmly held together, note the force required to pull the feet apart while
the great muscles of the thigh are fully contracted.

8. In forcible and resisted flexion of the wrist two tendons come up
in relief. On the outer side of one we feel the pulse at the wrist, the
radial artery here lying close to the radius.

9. On the outer side of the wrist we can distinctly see and feel when
in action, the three extensor tendons of the thumbs. Between two of them
is a deep depression at the base of the thumb, which the French call the
"anatomical tobacco box."

10. The relative position of the several extensor tendons on the back
of the wrist and fingers as they play in their grooves over the back of
the radius and ulna can be distinctly traced when the several muscles are
put in action.

11. There are several strong tendons to be seen and felt about the
ankle. Behind is the _tendo Achillis_. It forms a high relief with a
shallow depression on each side of it. Behind both the inner and outer
ankle several tendons can be felt. Over the front of the ankle, when the
muscles are in action, we can see and feel several tendons. They start up
like cords when the action is resisted. They are kept in their proper
relative position by strong pulleys formed by the annular ligament. Most
of these tendons can be best seen by stand a model on one foot, _i.e._ in
unstable equilibrium.



III. Landmarks of the Heart.


To have a general idea of the form and position of the _heart_, map its
outline with colored pencils or crayon on the chest wall itself, or on
some piece of clean, white cloth, tightly pinned over the clothing. A
pattern of the heart may be cut out of pasteboard, painted red, or papered
with red paper, and pinned in position outside the clothing. The apex of
the heart is at a point about two inches below the left nipple and one
inch to its sternal side. This point will be between the fifth and sixth
ribs, and can generally be determined by feeling the apex beat.




IV. Landmarks of a Few Arteries.


The pulsation of the _temporal_ artery can be felt in front of the ear,
between the zygoma and the ear. The _facial_ artery can be distinctly felt
as it passes over the upper jaw at the front edge of the masseter muscle.
The pulse of a sleeping child can often be counted at the anterior
fontanelle by the eye alone.

About one inch above the clavicle, near the outer border of the
sterno-mastoid, we can feel the pulsation of the great _subclavian_
artery. At the back of the knee the _popliteal_ artery can be felt
beating. The _dorsal_ artery of the foot can be felt beating on a line
from the middle of the ankle to the interval between the first and second
metatarsal bones.

When the arm is raised to a right angle with the body, the _axillary_
artery can be plainly felt beating in the axilla. Extend the arm with palm
upwards and the _brachial_ artery can be felt close to the inner side of
the biceps. The position of the _radial_ artery is described in Experiment
102.




Glossary.



Abdomen (Lat. _abdo_, _abdere_, to conceal). The largest cavity of
the body, containing the liver, stomach, intestines, and other organs.

Abductor (Lat. _abduco_, to draw from). A muscle which draws a limb
from the middle line of the body, or a finger or toe from the middle line
of the foot or hand.

Absorbents (Lat. _absorbere_, to suck up). The vessels which take
part in the process of absorption.

Absorption. The process of sucking up nutritive or waste matters by
the blood-vessels or lymphatics.

Accommodation of the Eye. The alteration in the shape of the
crystalline lens, which accommodates, or adjusts, the eye for near or
remote vision.

Acetabulum (Lat. _acetabulum_, a small vinegar-cup). The cup-shaped
cavity of the innominate bone for receiving the head of the femur.

Acid (Lat. _acidus_, from _acere_, to be sour). A substance usually
sour, sharp, or biting to the taste.

Acromion (Gr. ἀκρον the tip, and ᾧμος, the shoulder). The part of the scapula
forming the tip of the shoulder.

Adam's Apple. An angular projection of cartilage in the front of the
neck. It may be particularly prominent in men.

Adductor (Lat. _adduco_, to draw to). A muscle which draws towards
the middle line of the body, or of the hand or foot.

Adenoid (Gr. ἀδήν, a gland). Tissue resembling gland tissue.

Afferent (Lat. _ad_, to, and _fero_, to convey). Vessels or nerves
carrying the contents or impulses from the periphery to the center.

Albumen, or Albumin (Lat. _albus_, white). An animal substance
resembling the white of an egg.

Albuminuria. A combination of the words "albumin" and "urine."
Presence of _albumen_ in the _urine_.

Aliment (Lat. _alo_, to nourish). That which affords nourishment;
food.

Alimentary (Lat. _alimentum_, food). Pertaining to _aliment_, or
food.

Alimentary Canal (Lat. _alimentum_). The tube in which the food is
digested or prepared for reception into the blood.

Alkali (Arabic _al kali_, the soda plant). A name given to certain
substances, such as soda, potash, and the like, which have the power of
combining with acids.

Alveolar (Lat. _alveolus_, a little hollow). Pertaining to the
alveoli, the _cavities_ for the reception of the teeth.

Amœba (Gr. ἀμείβω, to change). A single-celled, protoplasmic organism,
which is constantly changing its form by protrusions and withdrawals of
its substance.

Amœboid. Like an _amœba_.

Ampulla (Lat. _ampulla_, a wine-flask). The dilated part of the
semicircular canals of the internal ear.

Anabolism (Gr. ἀναβάλλω to throw or build up). The process by means of
which simpler elements are _built up_ into more complex.

Anæsthetics (Gr. ἀν, without, and αἰσθησία, feeling). Those medicinal
agents which prevent the feeling of pain, such as chloroform, ether,
laughing-gas, etc.

Anastomosis (Gr. ἀνά, by, and στόμα, a mouth). The intercommunication of
vessels.

Anatomy (Gr. ἀνατέμνω, to cut up). The science which describes the
structure of living things. The word literally means dissection.

Antiseptic (Lat. _anti_, against, and _sepsis_, poison). Opposing or
counter-acting putrefaction.

Antrum (Lat. _antrum_, a cave). The cavity in the upper jaw.

Aorta (Gr. ἀορτή, from ἀείρο, to raise up). The great artery that _rises
up_ from the left ventricle of the heart.

Aponeurosis (Gr. ἀπό, from, and νεῦρον, a nerve). A fibrous membranous
expansion of a tendon; the nerves and tendons were formerly thought to be
identical structures, both appearing as white cords.

Apoplexy (Gr. ἀποπληξία, a sudden stroke). The escape of blood from a
ruptured blood-vessel into the substance of the brain.

Apparatus. A number of organs of various sizes and structures working
together for some special object.

Appendages (Lat. _ad_ and _pendeo_, to hang from). Something
connected with a part.

Aqueous Humor (Lat. _aqua_, water). The watery fluid occupying the
space between the cornea and crystalline lens of the eye.

Arachnoid Membrane (Gr. ἀράχνη, a spider, and εἰδώς, like). The thin
covering of the brain and spinal cord, between the dura mater and the pia
mater.

Arbor Vitæ. Literally, "the tree of life"; a name given to the
peculiar appearance presented by a section of the cerebellum.

Areolar (Lat. _areola_, a small space, dim. of _area_). A term
applied to a connective tissue containing _small spaces_.

Artery (Gr. ἀήρ, air, and τερέω, to contain). A vessel by which blood is
carried away from the heart. It was supposed by the ancients to contain
only air, hence the name.

Articulation (Lat. _articulo_, to form a joint). The more or less
movable union of bones, etc.; a joint.

Arytenoid Cartilages (Gr. ἀρύταινα, a ladle). Two small cartilages of the
larynx, resembling the mouth of a pitcher.

Asphyxia (Gr. ἀ, without, and σφίξις, the pulse). Literally, "without
pulse." Condition caused by non-oxygenation of the blood.

Assimilation (Lat. _ad_, to, and _similis_, like). The conversion of
food into living tissue.

Asthma (Gr. ἆσθμα, a gasping). Spasmodic affection of the bronchial tubes
in which free respiration is interfered with, owing to their diminished
caliber.

Astigmatism (Gr. ἀ, without, and στίγμα, a point). Irregular refraction
of the eye, producing a blurred image.

Atrophy (Gr. ἀ, without, and τροφή, nourishment). Wasting of a part from
lack of nutrition.

Auditory Nerve (Lat. _audio_, to hear). The special nerve of hearing.

Auricle (Lat. _auricula_, a little ear). A cavity of the heart.

Azygos (Gr. ἀ, without, and ζυγός, a yoke). Without fellow; not paired.


Bacteria (βακτήριον, a staff). A microscopic, vegetable organism; certain
species are active agents in fermentation, while others appear to be the
cause of infectious diseases.

Bactericide (_Bacterium_ and Lat. _caedere_, to kill). Same as
_germicide_.

Bile. The gall, or peculiar secretion of the liver; a viscid, yellowish
fluid, and very bitter to the taste.

Biology (Gr. βίος, life, and λόγος, discourse). The science which treats
of living bodies.

Bladder (Saxon _bleddra_, a bladder, a goblet). A bag, or sac,
serving as a receptacle of some secreted fluid, as the _gall bladder_,
etc. The receptacle of the urine in man and other animals.

Bright's Disease. A group of diseases of the kidney, first described
by Dr. Bright, an English physician.

Bronchi (Gr. βρόγχος, windpipe). The first two divisions, or branches, of
the trachea; one enters each lung.

Bronchial Tubes. The smaller branches of the trachea within the
substance of the lungs terminating in the air cells.

Bronchitis. Inflammation of the larger bronchial tubes; a "cold"
affecting the air passages.

Bunion. An enlargement and inflammation of the first joint of the
great toe.

Bursa. A pouch; a membranous sac interposed between parts which are
subject to movement, one on the other, to allow them to glide smoothly.


Callus (Lat. _calleo_, to be thick-skinned). Any excessive hardness
of the skin caused by friction or pressure.

Canal (Lat. _canalis_, a canal). A tube or passage.

Capillary (Lat. _capillus_, hair). The smallest blood-vessels, so
called because they are so minute.

Capsule (Lat. _capsula_, a little chest). A membranous bag enclosing
a part.

Carbon Dioxid, often called _carbonic acid_. The gas which is present
in the air breathed out from the lungs; a waste product of the animal
kingdom and a food of the vegetable kingdom.

Cardiac (Gr. καρδία, the heart). The cardiac orifice of the stomach is
the upper one, and is near the heart; hence its name.

Carnivorous (Lat. _caro_, flesh, and _voro_, to devour). Subsisting
upon flesh.

Carron Oil. A mixture of equal parts of linseed oil and lime-water,
so called because first used at the Carron Iron Works in Scotland.

Cartilage. A tough but flexible material forming a part of the
joints, air passages, nostrils, ear; gristle, etc.

Caruncle (Lat. _caro_, flesh). The small, red, conical-shaped body at
the inner angle of the eye, consisting of a cluster of follicles.

Casein (Lat. _caseus_, cheese). The albuminoid substance of milk; it
forms the basis of cheese.

Catarrh. An inflammation of a mucous membrane, usually attended with
an increased secretion of mucus. The word is often limited to _nasal_
catarrh.

Cauda Equina (Lat., horse's tail). The collection of large nerves
descending from the lower end of the spinal cord.

Cell (Lat. _cella_, a storeroom). The name of the tiny miscroscopic
elements, which, with slender threads or fibers, make up most of the body;
they were once believed to be little hollow chambers; hence the name.

Cement. The substance which forms the outer part of the fang of a
tooth.

Cerebellum (dim. for _cerebrum_, the brain). The little brain,
situated beneath the posterior third of the cerebrum.

Cerebrum. The brain proper, occupying the upper portion of the skull.

Ceruminous (Lat. _cerumen_, ear wax). A term applied to the glands
secreting cerumen, or _ear wax_.

Chloral. A powerful drug and narcotic poison used to produce sleep.

Chloroform. A narcotic poison generally used by inhalation; of
extensive use in surgical operations. It produces anæsthesia.

Chondrin (Gr. χονδρός, cartilage). A kind of gelatine obtained by boiling
_cartilage_.

Chordæ Tendineæ. Tendinous cords.

Choroid (Gr. χορίον, skin, and εἶδος, form). The middle coat of the
eyeball.

Chyle (Gr. χυλός, juice). The milk-like fluid formed by the digestion of
fatty articles of food in the intestines.

Chyme (Gr. χυμός, juice). The pulpy
liquid formed by digestion in the stomach.

Cilia (pl. of _cilium_, an eyelash). Minute hair-like processes found
upon the cells of the air passages and other parts.

Ciliary Muscle. A small muscle of the eye which assists in
accommodation.

Circumvallate (Lat. _circum_, around, and _vallum_, a rampart).
Surrounded by a rampart, as are certain papillæ of the tongue.

Coagulation (Lat. _coagulo_, to curdle). Applied to the process by
which the blood clots or solidifies.

Cochlea (Lat. _cochlea_, a snail shell). The spiral cavity of the
internal ear.

Columnæ Carneæ. Fleshy projections in the ventricles of the heart.

Commissure (Lat. _con_, together, and _mitto_, _missum_, to put). A
joining or uniting together.

Compress. A pad or bandage applied directly to an injury to compress it.

Concha (Gr. κόγχη, a mussel shell). The shell-shaped portion of the
external ear.

Congestion (Lat. _con_, together, and _gero_, to bring). Abnormal
gathering of blood in any part of the body.

Conjunctiva (Lat. _con_, together, and _jungo_, to join). A thin
layer of mucous membrane which lines the eyelids and covers the front of
the eyeball, thus joining the latter to the lids.

Connective Tissue. The network which connects the minute parts of
most of the structures of the body.

Constipation (Lat. _con_, together, and _stipo_, to crowd close).
Costiveness.

Consumption (Lat. _consumo_, to consume). A disease of the lungs,
attended with fever and cough, and causing a decay of the bodily powers.
The medical name is _phthisis_.

Contagion (Lat. _con_, with, and _tango_ or _tago_, to touch). The
communication of disease by contact, or by the inhalation of the effluvia
of a sick person.

Contractility (Lat. _con_, together, and _traho_, to draw). The
property of a muscle which enables it to contract, or draw its extremities
closer together.

Convolutions (Lat. _con_, together, and _volvo_, to roll). The
tortuous foldings of the external surface of the brain.

Convulsion (Lat. _convello_, to pull together). A more or less
violent agitation of the limbs or body.

Coördination. The manner in which several different organs of the
body are brought into such relations with one another that their functions
are performed in harmony.

Coracoid (Gr. κόραξ, a crow, εἶδος, form). Shaped like a crow's beak.

Cornea (Lat. _cornu_, a horn). The transparent horn-like substance
which covers a part of the front of the eyeball.

Coronary (Lat. _corona_, a crown). A term applied to vessels and
nerves which encircle parts, as the _coronary_ arteries of the heart.

Coronoid (Gr. κορώνη;, a crow). Like a crow's beak; thus the _coronoid_
process of the ulna.

Cricoid (Gr. κρίκος, a ring, and εἶδος, form). A cartilage of the larynx
resembling a seal ring in shape.

Crystalline Lens (Lat. _crystallum_, a crystal). One of the humors of
the eye; a double-convex body situated in the front part of the eyeball.

Cumulative. A term applied to the violent action from drugs which
supervenes after the taking of several doses with little or no effect.

Cuticle (Lat. dim. of _cutis_, the skin). Scarf skin; the epidermis.

Cutis (Gr. σκῦτος, a skin or hide). The true skin, also called the
_dermis_.


Decussation (Lat. _decusso_, _decussatum_, to cross). The _crossing_
or running of one portion athwart another.

Degeneration (Lat. _degenerare_, to grow worse, to deteriorate). A
change in the structure of any organ which makes it less fit to perform
its duty.

Deglutition (Lat. _deglutire_, to swallow). The process of
swallowing.

Deltoid. Having a triangular shape; resembling the Greek letter
Δ (_delta_).

Dentine (Lat. _dens_, _dentis_, a tooth). The hard substance which
forms the greater part of a tooth; ivory.

Deodorizer. An agent which corrects any foul or unwholesome odor.

Dextrin. A soluble substance obtained from starch.

Diabetes Mellitus (Gr. διά, through, βαίνω, to go, and μέλι, honey).
Excessive flow of sugar-containing urine.

Diaphragm (Gr. διαφράσσω, to divide by a partition). A large, thin muscle
which separates the cavity of the chest from the abdomen.

Diastole (Gr. διαστέλλω, to dilate). The _dilatation_ of the heart.

Dietetics. That part of medicine which relates to diet, or food.

Diffusion of Gases. The power of gases to become intimately mingled.

Diplöe (Gr. διπλόω, to double, to fold). The osseous tissue between the
tables of the skull.

Dipsomania (Gr. δίψα, thirst, and μανία, madness). An insatiable desire
for intoxicants.

Disinfectants. Agents used to destroy the germs or particles of
living matter that are believed to be the causes of infection.

Dislocation (Lat. _dislocare_, to put out of place). An injury to a
joint in which the bones are displaced or forced out of their sockets.

Dissection (Lat. _dis_, apart, and _seco_, to cut). The cutting up of
an animal in order to learn its structure.

Distal (Lat. _dis_, apart, and _sto_, to stand). Away from the
center.

Duct (Lat. _duco_, to lead). A narrow tube.

Duodenum (Lat. _duodeni_, twelve). The first division of the small
intestines, about twelve fingers' breadth long.

Dyspepsia (Gr. -δύς, ill, and πέπτειν, to digest). A condition of the
alimentary canal in which it digests imperfectly. Indigestion.

Dyspnœa (Gr. δύς, difficult, and πνέω, to breathe). Difficult breathing.


Efferent (Lat. _effero_, to carry out). _Bearing_ or _carrying
outwards_, as from the center to the periphery.

Effluvia (Lat. _effluo_, to flow out). Exhalations or vapors coming
from the body, and from decaying animal or vegetable substances.

Element. One of the simplest parts of which anything consists.

Elimination (Lat. _e_, out of, and _limen, liminis_, a threshold).
The act of _expelling_ waste matters. Signifies, literally, "to throw out
of doors."

Emetic (Gr. ἐμέω, to vomit). A medicine which causes vomiting.

Emulsion (Lat. _emulgere_, to milk). Oil in a finely divided state,
suspended in water.

Enamel (Fr. _émail_). Dense material covering the crown of a tooth.

Endolymph (Gr. ἔνδον, within, and Lat. _lympha_, water). The fluid in
the membranous labyrinth of the ear.

Endosmosis (Gr. ἔνδον, within, and ὠθέω, to push). The current from
without _inwards_ when diffusion of fluids takes place through a membrane.

Epidemic (Gr. ἐπί, upon, and δέμος, the people). An extensively prevalent
disease.

Epiglottis (Gr. ἐπί, upon, and γλόττις, the entrance to the windpipe). A
leaf-shaped piece of cartilage which covers the top of the larynx during
the act of swallowing.

Epilepsy (Gr. ἐπίληψις, a seizure). A nervous disease accompanied by fits
in which consciousness is lost; the falling sickness.

Ether (Gr. αἰθήρ, the pure, upper air). A narcotic poison. Used as an
anæsthetic in surgical operations.

Eustachian (from an Italian anatomist named Eustachi). The tube which
leads from the throat to the middle ear, or tympanum.

Excretion (Lat. _excerno_, to separate). The separation from the
blood of the waste matters of the body; also the materials excreted.

Exosmosis (Gr. ἔξω, without, and ᾀθέω, to push). The current from within
_outwards_ when diffusion of fluids takes place through a membrane.

Expiration (Lat. _expiro_, to breathe out). The act of forcing air
out of the lungs.

Extension (Lat. _ex_, out, and _tendo_, to stretch). The act of
restoring a limb, etc., to its natural position after it has been flexed
or bent; the opposite of _flexion_.


Fauces. The part of the mouth which opens into the pharynx.

Fenestra (Lat.). Literally, "a window." Fenestra ovalis and
fenestra rotunda, the oval and the round window; two apertures in the
bone between the tympanic cavity and the labyrinth of the ear.

Ferment. That which causes fermentation, as yeast.

Fermentation (Lat. _fermentum_, boiling). The process of undergoing
an effervescent change, as by the action of yeast; in a wider sense, the
change of organized substances into new compounds by the action of a
ferment. It differs in kind according to the nature of the ferment.

Fiber (Lat. _fibra_, a filament). One of the tiny threads of which
many parts of the body are composed.

Fibrilla. A little fiber; one of the longitudinal threads into which
a striped muscular fiber can be divided.

Fibrin (Lat. _fibra_, a fiber). An albuminoid substance contained in
the flesh of animals, and also produced by the coagulation of blood.

Flexion (Lat. _flecto_, to bend). The act of bending a limb, etc.

Follicle (Lat. dim. of _follis_, a money bag). A little pouch or
depression.

Fomentation (Lat. _foveo_, to keep warm). The application of any
warm, medicinal substance to the body, by which the vessels are relaxed.

Foramen. A hole, or aperture.

Frontal Sinus. A blind or closed cavity in the bones of the skull
just over the eyebrows.

Fumigation (Lat. _fumigo_, to perfume a place). The use of certain
fumes to counteract contagious effluvia.

Function (Lat. _functio_, a doing). The special duty of any organ.


Ganglion (Gr. γάγγλιν, a knot). A knot-like swelling in a nerve; a
smaller nerve center.

Gastric (Gr. γαστήρ, stomach). Pertaining to the stomach.

Gelatine (Lat. _gelo_, to congeal). An animal substance which
dissolves in hot water and forms a jelly on cooling.

Germ (Lat. _germen_, a sprout, bud). Disease germ; a name applied to
certain tiny bacterial organisms which have been demonstrated to be the
cause of disease.

Germicide (_Germ_, and Lat. _caedere_, to kill). Any agent which has
a destructive action upon living germs, especially _bacteria_.

Gland (Lat. _glans_, an acorn). An organ consisting of follicles and
ducts, with numerous blood-vessels interwoven.

Glottis (Gr. γλόττα, the tongue).
The narrow opening between the vocal cords.

Glucose. A kind of sugar found in fruits, also known as grape sugar.

Gluten. The glutinous albuminoid ingredient of cereals.

Glycogen. Literally, "producing glucose." Animal starch found in
liver, which may be changed into glucose.

Gram. Unit of metric system, 15.43 grains troy.

Groin. The lower part of the abdomen, just above each thigh.

Gustatory (Lat. _gusto_, _gustatum_, to taste). Belonging to the
sense of _taste_.

Gymnastics (Gr. γυμνάξω, to exercise). The practice of athletic exercises.


Hæmoglobin (Gr. αἷμα, blood, and Lat. _globus_, a globe or globule).
A complex substance which forms the principal coloring constituent of the
red corpuscles of the blood.

Hemispheres (Gr. ἡμί, half, and σφαῖρα, a sphere). Half a sphere, the
lateral halves of the cerebrum, or brain proper.

Hemorrhage (Gr. αἷμα, blood, and ῥήγνυμι, to burst). Bleeding, or the
loss of blood.

Hepatic (Gr. ἧπαρ, the liver). Pertaining to the liver.

Herbivorous (Lat. _herba_, an herb, and _voro_, to devour). Applied
to animals that subsist upon vegetable food.

Heredity. The predisposition or tendency derived from one's ancestors
to definite physiological actions.

Hiccough. A convulsive motion of some of the muscles used in
breathing, accompanied by a shutting of the glottis.

Hilum, sometimes written Hilus. A small fissure, notch, or
depression. A term applied to the concave part of the kidney.

Homogeneous (Gr. ὁμός, the same, and γένος, kind). Of the _same kind_
or quality throughout; uniform in nature,--the reverse of heterogeneous.

Humor. The transparent contents of the eyeball.

Hyaline (Gr. ὕαλος, glass). Glass-like, resembling glass in transparency.

Hydrogen. An elementary gaseous substance, which, in combination with
oxygen, produces water.

Hydrophobia (Gr. ὕδωρ, water, and φοβέομαι, to fear). A disease caused by
the bite of a rabid dog or other animal.

Hygiene (Gr. ὑγἰεια  health). The art of preserving health and preventing
disease.

Hyoid (Gr. letter υ, and εἰδος, form, resemblance). The bone at the root
of the tongue, shaped like the Greek letter υ.

Hypermetropia (Gr. ὑπέρ  over, beyond, μέτρον, measure, and ώ̓ψ, the
eye). Far-sightedness.

Hypertrophy (Gr. ὑπέρ, over, and τροφή, nourishment). Excessive growth;
thickening or enlargement of any part or organ.


Incisor (Lat. _incido_, to cut). Applied to the four front teeth of
both jaws, which have sharp, cutting edges.

Incus. An anvil; the name of one of the bones of the middle ear.

Indian Hemp. The common name of _Cannabis Indica_, an intoxicating
drug known as _hasheesh_ and by other names in Eastern countries.

Inferior Vena Cava. The chief vein of the lower part of the body.

Inflammation (Lat. prefix _in_ and _flammo_, to flame). A redness or
swelling of any part of the body with heat and pain.

Insalivation (Lat. _in_ and _saliva_, the fluid of the mouth). The
mingling of the saliva with the food during the act of chewing.

Inspiration (Lat. _inspiro, spiratum_, to breathe in). The act of
drawing in the breath.

Intestine (Lat. _intus_, within). The part of the alimentary canal
which is continuous with the lower end of the stomach; also called the
bowels.

Iris (Lat. _iris_, the rainbow). The thin, muscular ring which lies
between the cornea and crystalline lens, giving the eye its special color.


Jaundice (Fr. _jaunisse_, yellow). A disorder in which the skin and
eyes assume a yellowish tint.


Katabolism (Gr. καταβάλλω, to throw down). The process by means of which
the more complex elements are rendered more simple and less complex. The
opposite of _anabolism_.


Labyrinth. The internal ear, so named from its many windings.

Lacrymal Apparatus (Lat. _lacryma_, a tear). The organs for forming
and carrying away the tears.

Lacteals (Lat. _lac, lactis_, milk). The absorbent vessels of the
small intestines.

Laryngoscope (Gr. λάρυγξ, larynx, and σκοπέω, to behold). An instrument
consisting of a mirror held in the throat, and a reflector to throw light
on it, by which the interior of the larynx is brought into view.

Larynx. The cartilaginous tube situated at the top of the windpipe.

Lens. Literally, a lentil; a piece of transparent glass or other
substance so shaped as either to converge or disperse the rays of light.

Ligament (Lat. _ligo_, to bind). A strong, fibrous material binding
bones or other solid parts together.

Ligature (Lat. _ligo_, to bind). A thread of some material used in
tying a cut or injured artery.

Lobe. A round, projecting part of an organ, as of the liver, lungs,
or brain.

Lymph (Lat. _lympha_, pure water). The watery fluid conveyed by the
lymphatic vessels.

Lymphatic Vessels. A system of absorbent vessels.


Malleus. Literally, the mallet; one of the small bones of the middle
ear.

Marrow. The soft, fatty substance contained in the cavities of bones.

Mastication (Lat. _mastico_, to chew). The act of cutting and
grinding the food to pieces by means of the teeth.

Meatus (Lat. _meo_, _meatum_, to pass). A _passage_ or canal.

Medulla Oblongata. The "oblong marrow"; that portion of the brain
which lies upon the basilar process of the occipital bone.

Meibomian. A term applied to the small glands between the conjunctiva
and tarsal cartilages, discovered by _Meibomius_.

Membrana Tympani. Literally, the membrane of the drum; a delicate
partition separating the outer from the middle ear; it is sometimes
popularly called "the drum of the ear."

Membrane. A thin layer of tissue serving to cover some part of the
body.

Mesentery (Gr. μέσος, middle, and ἔντερον, the intestine). A duplicature
of the peritoneum covering the small _intestine_, which occupies the
_middle_ or center of the abdominal cavity.

Metabolism (Gr. μεταβολή, change). The _changes_ taking place in cells,
whereby they become more complex and contain more force, or less complex
and contain less force. The former is constructive metabolism, or
_anabolism_; the latter, destructive metabolism, or _katabolism_.

Microbe (Gr. μικρός, little, and βίος, life). A microscopic organism,
particularly applied to bacteria.

Microscope (Gr. μικρός, small, and σκοπέω;, to look at). An optical
instrument which assists in the examination of minute objects.

Molar (Lat. _mola_, a mill). The name applied to the three back
teeth at each side of the jaw; the grinders, or mill-like teeth.

Molecule (dim. of Lat. _moles_, a mass). The smallest quantity into
which the mass of any substance can physically be divided. A molecule may
be chemically separated into two or more atoms.

Morphology (Gr. μόρφη, form, and λόγος, discourse). The study of the laws
of form or structure in living beings.

Motor (Lat. _moveo_, _motum_, to move). The name of the nerves which
conduct to the muscles the stimulus which causes them to contract.

Mucous Membrane. The thin layer of tissue which covers those internal
cavities or passages which communicate with the external air.

Mucus. The glairy fluid secreted by mucous membranes.

Myopia (Gr. μύω, to shut, and ὤψ, the eye). A defect of vision dependent
upon an eyeball that is too long, rendering distant objects indistinct;
_near sight_.

Myosin (Gr. μῶς, muscle). Chief proteid substance of muscle.


Narcotic (Gr. ναρκάω, to benumb). A medicine which, in poisonous doses,
produces stupor, convulsions, and sometimes death.

Nerve Cell. A minute round and ashen-gray cell found in the brain and
other nervous centers.

Nerve Fiber. An exceedingly slender thread of nervous tissue.

Nicotine. The poisonous and stupefying oil extracted from tobacco.

Nostril (Anglo-Saxon _nosu_, nose, and _thyrl_, a hole). One of the
two outer openings of the nose.

Nucleolus (dim. of _nucleus_). A little nucleus.

Nucleus (Lat. _nux_, a nut). A central part of any body, or that
about which matter is collected. In anatomy, a cell within a cell.

Nutrition (Lat. _nutrio_, to nourish). The processes by which the
nourishment of the body is accomplished.


Odontoid (Gr. ὀδούς, a tooth, εἶδος, shape). The name of the bony peg of
the second vertebra, around which the first turns.

Œsophagus. Literally, that which carries food. The tube leading
from the throat to the stomach; the gullet.

Olecranon (Gr. ὠλένη, the elbow, and κρανίον, the top of the head). A
curved eminence at the upper and back part of the ulna.

Olfactory (Lat. _olfacio_, to smell). Pertaining to the sense of
smell.

Optic (Gr. ὀπτεύω, to see). Pertaining to the sense of sight.

Orbit (Lat. _orbis_, a circle). The bony socket or cavity in which
the eyeball is situated.

Organ (Lat. _organum_, an instrument or implement). A portion of the
body having some special function or duty.

Osmosis (Gr. ὠσμός, impulsion). Diffusion of liquids through membranes.

Ossa Innominata, pl. of Os Innominatum (Lat.). "Unnamed bones." The
irregular bones of the pelvis, unnamed on account of their non-resemblance
to any known object.

Otoconia (Gr. οὖς, an ear, and κονία, dust). Minute crystals of lime in
the vestibule of the ear; also known as _otoliths_.


Palate (Lat. _palatum_, the palate). The roof of the mouth,
consisting of the hard and soft palate.

Palpitation (Lat. _palpitatio_, a frequent or throbbing motion). A
violent and irregular beating of the heart.

Papilla. The small elevations found on the skin and mucous membranes.

Paralysis (Gr. παραλύω, to loosen; also, to disable). Loss of function,
especially of motion or feeling. Palsy.

Parasite. A plant or animal that grows or lives on another.

Pelvis. Literally, a basin. The bony cavity at the lower part of the
trunk.

Pepsin (Gr. πέπτω, to digest). The active principle of the gastric juice.

Pericardium (Gr. περί, about, and καρδία, heart). The sac enclosing the
heart.

Periosteum (Gr. περί, around, ὀστέον, a bone). A delicate fibrous
membrane which invests the bones.

Peristaltic Movements (Gr. περί, round, and στέλλω, to send). The slow,
wave-like movements of the stomach and intestines.

Peritoneum (Gr. περιτείνω, to stretch around). The investing membrane of
the stomach, intestines, and other abdominal organs.

Perspiration (Lat. _perspiro_, to breathe through). The sweat.

Petrous (Gr. πέτρα, a rock). The name of the hard portion of the temporal
bone, in which are situated the drum of the ear and labyrinth.

Phalanges (Gr. φάλαγξ, a body of soldiers closely arranged in ranks and
files). The bones of the fingers and toes.

Pharynx (Gr. φάρμγξ, the throat). The cavity between the back of the
mouth and the gullet.

Physiology (Gr. φύσις, nature, and λόγος, a discourse). The science of the
functions of living, organized beings.

Pia Mater (Lat.). Literally, the tender mother; the innermost of the
three coverings of the brain. It is thin and delicate; hence the name.

Pinna (Lat. a feather or wing). External cartilaginous flap of the
ear.

Plasma (Gr. πλάσσω, to mould). Anything formed or moulded. The liquid
part of the blood.

Pleura (Gr. πλευρά, the side, also a rib). A membrane covering the lung,
and lining the chest.

Pleurisy. An inflammation affecting the pleura.

Pneumogastric (Gr. πνεύμων, the lungs, and γαστήρ, the stomach). The chief
nerve of respiration; also called the _vagus_, or wandering nerve.

Pneumonia. An inflammation affecting the air cells of the lungs.

Poison (Fr. _poison_). Any substance, which, when applied externally,
or taken into the stomach or the blood, works such a change in the animal
economy as to produce disease or death.

Pons Varolii. Bridge of Varolius. The white fibers which form a
_bridge_ connecting the different parts of the brain, first described by
_Varolius_.

Popliteal (Lat. _poples_, _poplitis_, the ham, the back part of the
knee). The space _behind the knee joint_ is called the _popliteal_ space.

Portal Vein (Lat. _porta_, a gate). The venous trunk formed by the
veins coming from the intestines. It carries the blood to the liver.

Presbyopia (Gr. πρέσβυς, old, and ὤψ, the eye). A defect of the
accommodation of the eye, caused by the hardening of the crystalline
lens; the "far sight" of adults and aged persons.

Process (Lat. _procedo_, _processus_, to proceed, to go forth). Any
projection from a surface; also, a method of performance; a procedure.

Pronation (Lat. _pronus_, inclined forwards). The turning of the hand
with the palm downwards.

Pronator. The group of muscles which turn the hand palm downwards.

Proteids (Gr. πρῶτος, first, and εἶδος, form). A general term for the
albuminoid constitutents of the body.

Protoplasm (Gr. πρῶτος, first, and πλάσσω, to form). A _first-formed_
organized substance; primitive organic cell matter.

Pterygoid (Gr. πτέρων, a wing, and εἶδος, form, resemblance). Wing-like.

Ptomaine (Gr. πτῶμα, a dead body). One of a class of animal bases or
alkaloids formed in the putrefaction of various kinds of albuminous
matter.

Ptyalin (Gr. σίαλον, saliva). A ferment principle in _saliva_, having
power to convert starch into sugar.

Pulse (Lat. _pello, pulsum_, to beat). The throbbing of an artery
against the finger, occasioned by the contraction of the heart. Commonly
felt at the _wrist_.

Pupil (Lat. _pupilla_). The central, round opening in the iris,
through which light passes into the interior of the eye.

Pylorus (Gr. πυλουρός, a gatekeeper). The lower opening of the stomach,
at the beginning of the small intestine.


Reflex (Lat. _reflexus_, turned back). The name given to involuntary
movements produced by an excitation traveling along a sensory nerve to a
center, where it is turned back or reflected along motor nerves.

Renal (Lat. _ren_, _renis_, the kidney). Pertaining to the _kidneys_.

Respiration (Lat. _respiro_, to breathe frequently). The function of
breathing, comprising two acts,--_inspiration_, or breathing in, and
_expiration_, or breathing out.

Retina (Lat. _rete_, a net). The innermost of the three tunics, or
coats, of the eyeball, being an expansion of the optic nerve.

Rima Glottidis (Lat. _rima_, a chink or cleft). The _opening_ of the
glottis.


Saccharine (Lat. _saccharum_, sugar). The group of food substances
which embraces the different varieties of sugar, starch, and gum.

Saliva. The moisture, or fluids, of the mouth, secreted by the
salivary glands; the spittle.

Sarcolemma (Gr. σάρξ, flesh, and λέμμα, a husk). The membrane which
surrounds the contractile substance of a striped muscular fiber.

Sclerotic (Gr. σκληρός, hard). The tough, fibrous, outer coat of the
eyeball.

Scurvy. Scorbutus,--a disease of the general system, having prominent
skin symptoms.

Sebaceous (Lat. _sebum_, fat). Resembling fat; the name of the oily
secretion by which the skin is kept flexible and soft.

Secretion (Lat. _secerno_, _secretum_, to separate). The process of
separating from the blood some essential, important fluid; which fluid is
also called a _secretion_.

Semicircular Canals. Three canals in the internal ear.

Sensation. The perception of an external impression by the nervous
system.

Serum. The clear, watery fluid which separates from the clot of the
blood.

Spasm (Gr. σπασμός, convulsion). A sudden, violent, and involuntary
contraction of one or more muscles.

Special Sense. A sense by which we receive particular sensations,
such as those of sight, hearing, taste, and smell.

Sputum, pi. Sputa (Lat. _spuo_, _sputum_, to _spit_). The matter
which is coughed up from the air passages.

Stapes. Literally, a stirrup; one of the small bones of the middle
ear.

Stimulant (Lat. _stimulo_, to prick or goad on). An agent which
causes an increase of vital activity in the body or in any of its parts.

Striated (Lat. _strio_, to furnish with channels). Marked with fine
lines.

Styptics (Gr. στυπτικός astringent). Substances used to produce a
contraction or shrinking of living tissues.

Subclavian Vein (Lat. _sub_, under, and _clavis_, a key). The great
vein bringing back the blood from the arm and side of the head; so called
because it is situated underneath the _clavicle_, or collar bone.

Superior Vena Cava (Lat., upper hollow vein). The great vein of the
upper part of the body.

Suture (Lat. _sutura_, a seam). The union of certain bones of the
skull by the interlocking of jagged edges.

Sympathetic System of Nerves. A double chain of nervous ganglia,
situated chiefly in front of, and on each side of, the spinal column.

Symptom (Gr. σύν, with, and πίπτω, to fall). A sign or token of disease.

Synovial (Gr. σύν, with, and ὠόν, an egg). The liquid which lubricates
the joints; joint-oil. It resembles the white of a raw egg.

System. A number of different organs, of similar structures,
distributed throughout the body and performing similar functions.

Systemic. Belonging to the system, or body, as a whole.

Systole (Gr. συστέλλω, to contract). The contraction of the heart, by
which the blood is expelled from that organ.


Tactile (Lat. _tactus_, touch). Relating to the sense of touch.

Tartar. A hard crust which forms on the teeth, and is composed of
salivary mucus, animal matter, and a compound of lime.

Temporal (Lat. _tempus_, time, and _tempora_, the temples).
Pertaining to the temples; so called because the hair begins to turn white
with age in that portion of the scalp.

Tendon (Lat. _tendo_, to stretch). The white, fibrous cord, or band,
by which a muscle is attached to a bone; a sinew.

Tetanus (Gr. τείνω, to stretch). A disease
marked by persistent contractions of all or some of the voluntary muscles;
those of the jaw are sometimes solely affected; the disorder is then
termed lockjaw.

Thorax (Gr. θώραξ, a breast-plate). The upper cavity of the trunk of the
body, containing the lungs, heart, etc.; the chest.

Thyroid (Gr. θυρέος, a shield, and εἶδος, form). The largest of
the cartilages of the larynx: its projection in front is called "Adam's
Apple."

Tissue. Any substance or texture in the body formed of various
elements, such as cells, fibers, blood-vessels, etc., interwoven with each
other.

Tobacco (Indian _tabaco_, the tube, or pipe, in which the Indians
smoked the plant). A plant used for smoking and chewing, and in snuff.

Trachea (Gr. τραχύς, rough). The windpipe.

Tragus (Gr. τράγος, a goat). The eminence in front of the opening of the
ear; sometimes hairy, like a goat's beard.

Transfusion (Lat. _transfundo_, to pour from one vessel to another).
The operation of injecting blood taken from one person into the veins of
another.

Trichina Spiralis. (A twisted hair). A minute species of parasite, or
worm, which infests the flesh of the hog: may be introduced into the human
system by eating pork not thoroughly cooked.

Trochanter (Gr. τροχάω, to turn, to revolve). Name given to two
projections on the upper extremities of the femur, which give attachment
to the _rotator_ muscles of the thigh.

Trypsin. The ferment principle in pancreatic juice, which converts
proteid material into peptones.

Tubercle (Lat. _tuber_, a bunch). A pimple, swelling, or tumor. A
morbid product occurring in certain lung diseases.

Tuberosity (Lat. _tuber, tuberis_, a swelling). A protuberance.

Turbinated (Lat. _turbinatus_, from _turbo, turbinis_, a top). Formed
like a _top_; a name given to the bones in the outer wall of the nasal
fossæ.

Tympanum (Gr. τύμπανον, a drum). The cavity of the middle ear, resembling
a drum in being closed by two membranes.


Umbilicus (Lat., the navel.) A round cicatrix or scar in the median
line of the abdomen.

Urea (Lat. _urina_, urine). Chief solid constitutent of _urine_.
Nitrogenous product of tissue decomposition.

Ureter (Gr. οὐρέω, to pass urine).
The tube through which the _urine_ is conveyed from the kidneys to the
bladder.

Uvula (Lat. _uva_, a grape). The small, pendulous body attached to
the back part of the palate.


Vaccine Virus (Lat. _vacca_, a cow, and _virus_, poison). The
material derived from heifers for the purpose of vaccination,--the great
preventive of smallpox.

Valvulae Conniventes. A name given to transverse folds of the mucous
membrane in the small intestine.

Varicose (Lat. _varix_, a dilated vein). A distended or enlarged
vein.

Vascular (Lat. _vasculum_, a little vessel). Pertaining to or
possessing blood or lymph vessels.

Vaso-motor (Lat. _vas_, a vessel, and _moveo, motum_, to move).
Causing _motion_ to the _vessels_. Vaso-motor nerves cause contraction and
relaxation of the blood-vessels.

Venæ Cavæ, pl. of Vena Cava. "Hollow veins." A name given to the
two great veins of the body which meet at the right auricle of the heart

Venous (Lat. _vena_, a vein). Pertaining to, or contained within, a
vein.

Ventilation. The introduction of fresh air into a room or building in
such a manner as to keep the air within it in a pure condition.

Ventral (Lat. _venter, ventris_, the belly). Belonging to the
abdominal or belly cavity.

Ventricles of the Heart. The two largest cavities of the heart.

Vermiform (Lat. _vermis_, a worm, and _forma_, form). Worm-shaped.

Vertebral Column (Lat. _vertebra_, a joint). The backbone; also
called the spinal column and spine.

Vestibule. A portion of the internal ear, communicating with the
semicircular canals and the cochlea, so called from its fancied
resemblance to the vestibule, or porch, of a house.

Villi (Lat. _villus_, shaggy hair). Minute, thread-like projections
upon the internal surface of the small intestine, giving it a velvety
appearance.

Virus (Lat., poison). Foul matter of an ulcer; poison.

Vital Knot. A part of the medulla oblongata, the destruction of which
causes instant death.

Vitreous (Lat. _vitrum_, glass). Having the appearance of glass;
applied to the humor occupying the largest part of the cavity of the
eyeball.

Vivisection (Lat. _vivus_, alive, and _seco_, to cut). The practice
of operating upon living animals, for the purpose of studying some
physiological process.

Vocal Cords. Two elastic bands or ridges situated in the larynx; the
essential parts of the organ of voice.


Zygoma (Gr. ζυγώς, a yoke). The arch formed by the malar bone and the
zygomatic process of the temporal bone.




Index.


Absorption
  from mouth and stomach
  by the intestines
Accident and emergencies
Achilles, Tendon of
Air, made impure by breathing
  Foul, effect of, on health
Alcohol, Effect of, on bones
  Effect of, on muscles
  Effect of, on muscular tissue
  Effect of, on physical culture
  Nature of
  Effects of, on human system
    and digestion
  Effect of, on the stomach
    and the gastric juice
  Final results on digestion
  Effects of, on the liver
  Fatty degeneration due to
  Effect of, on the circulation
  Effect of, on the heart
  Effect of, on the blood-vessels
  Effect of, on the lungs
  Other results of, on lungs
  Effect of, on disease
  Effect of, on kidneys
Alcohol
  as cause of Bright's disease
  and the brain
  How, injures the brain
  Why brain suffers from
  the enemy of brain work
  Other physical results of
  Diseases produced by
  Mental and moral ruin by
  Evil results of, inherited
  Effect of, on taste
  Effect of, on the eye
  Effect of, on throat and voice
Alcoholic beverages
Alcoholic fermentation and Bacteria
Anabolism defined
Anatomy defined
Antidotes for poisons
Antiseptics
Apparatus, Question of
Arm, Upper
Arteries
Astigmatism
Asphyxia
Atlas and axis
Atmosphere, how made impure

Bacteria, Nature of
Bacteria, Struggle for existence of
  Importance of, in Nature
  Action of
  Battle against
Baths and bathing
Bathing, Rules and precautions
Bicycling
Bile
Biology defined
Bladder
Bleeding, from stomach
  from lungs
  from nose
  How to stop
Blood, Circulation of
  Physical properties of
  corpuscles
  Coagulation of
  General plan of circulation
Blood-vessels, Nervous control of
  connected with heart
  Effect of alcohol on
  Injuries to
Bodies, living, Characters of
Body, General plan of
Bone, Chemical composition of
  Physical properties of
  Microscopic structure of
Bones, uses of, The
  Kinds of
  in infancy and childhood
  positions at school
  in after life
  Broken
  broken, Treatment for
  Effect of alcohol on
  Effect of tobacco on
Breathing, Movements of
Breathing, Mechanism of
  Varieties of
  Nervous control of
  change in the air
  Air, made impure by
Brain, as a whole
  Membranes of
  as a reflex center
  Effects of alcohol on
Brain center, Functions of, in perception of impressions
Bright's disease caused by alcohol
Bronchial tubes
Burns or scalds

Capillaries
Carbohydrates
Carpus
Cartilage
  Hyaline
  White fibro-
  Yellow fibro-
  Thyroid
  Arytenoid
  Cricoid
Cells
  and the human organism
  Kinds of
  Vital properties of
  Epithelial
  Nerve
Cerebrum
Cerebellum
Chemical compounds in the body
Chloral
Chyle
Chyme
Cilia of air passages
Circulation
  General plan of
  Portal
  Pulmonic
  Systemic
  Effect of alcohol on
Clavicle
Cleanliness, Necessity for
Clothing, Use of
  Material used for
  Suggestions for use of
  Effects of tight-fitting
  Miscellaneous hints on use of
  Catching, on fire
Coagulation of blood
Cocaine, ether, and chloroform
Cochlea of ear
Cocoa
Coffee
Colon
Color-blindness
Complemental air
Compounds, Chemical
  Organic
Condiments
Conjunctiva
Connective tissue
Consonants
Contagious diseases
Contraction, Object of
Contusions and bruises
Convulsions
Cooking
Coughing
Cornea
Corpuscles, Blood
  Red
  Colorless
Corti, Organ of
Cranial Nerves
Cranium, Bones of
Crying
Crystalline lens
Cuticle
Cutis vera, or true skin

Degeneration, Fatty, due to alcohol
Deglutition, or swallowing
Deodorants
Diet, Important articles of
  Effect of occupation on
  Too generous
  Effect of climate on
Digestion, Purpose of
  General plan of
  in small intestines
  in large intestines
  Effect of alcohol on
Disease, Effect of alcoholics upon
Diseases, infectious and contagious, Management of
  Care of
  Hints on nursing
Disinfectants
  Air and water as
  How to use
Dislocations
Dogs, mad, Bites of
Drowning, Apparent
  Methods of treating
  Sylvester method
  Marshall Hall method
Duct, Hepatic
  Cystic
  Common bile
  Thoracic
  Nasal
Duodenum
Dura mater

Ear, External
  Middle
  Bones of the
  Internal
  Practical hints on care of
  Foreign bodies in
Eating, Practical points about
Eggs as food
Elements, Chemical, in the body
Epidermis, or cuticle
Epiglottis
Epithelium
  Squamous
  Columnar
  Glandular
  Ciliated
Epithelial tissues, Functions of
Erect position
Ethmoid bone
Eustachian tube
Excretion
Exercise, Physical
  Importance of
  Effect of, on muscles
  Effect of, on important organs
  Effect of, on personal appearance
  Effect of excessive
  Amount of, required
  Time for
  Physical, in school
  Practical points about
  Effect of alcohol and tobacco on
Experiments, Limitations of
  Value of
Eye
  Inner structure of
  Compared to camera
  Refractive media of
  Movements of
  Foreign bodies in
  Practical hints on care of
  Effect of alcohol on
  Effect of tobacco on
Eyeball, Coats of
Eyelids and eyebrows
Eyesight in schools

Face
  Bones of the
Fainting
Fats
  and oils
Femur
Fibrin
Fibula
Fish as food
Food and drink
Food, why we need it
  Absorption of, by the blood
  Quantity of, as affected by age
  Kinds of, required
Foods, Classification of
  Nitrogenous
  Proteid
  Saline or mineral
  Vegetable
  Proteid vegetable
  Non-proteid vegetable
  Non-proteid animal
  Table of
Food materials, Table of
  Composition of
Foot
Foul air, Effect of, on health
Frontal bone
Frost bites
Fruits as food

Gall bladder
Garden vegetables
Gastric glands
Gastric juice, Effect of alcohol on
Glands
  Mesenteric
  Lymphatic
  Ductless
  Thyroid
  Thymus
  Suprarenal
  Lacrymal
Glottis

Hair
  Structure of
Hair and nails, Care of
Hall, Marshall, method for apparent drowning
Hand
Haversian canals
Head and spine, how joined
Head, Bones of
Hearing, Sense of
  Mechanism of
  Effect of tobacco on
Heart
  Valves of
  General plan of blood-vessels connected with
  Rhythmic action of
  Impulse and sounds of
  Nervous control of
  Effect of alcohol on
  Effect of tobacco on
Heat, Animal
  Sources of
Hiccough
Hip bones
Histology defined
Humerus
Hygiene defined
Hyoid bone
Hypermetropia

Ileum
Injured, Prompt aid to
Insalivation
Intestine, Small
  Coats of small
  Large
Intoxicants, Physical results of
Iris of the eye

Jejunum
Joints
  Imperfect
  Perfect
  Hinge
  Ball-and-socket
  Pivot

Katabolism defined
Kidneys
  Structure of
  Function of
  Action if, how modified
  Effect of alcohol on
Kidneys and skin

Lacrymal apparatus
  gland
Lacteals
Landmarks, Bony
  Muscular
  heart
  arteries
Larynx
Laughing
Lens, Crystalline
Levers in the body
Life, The process of
Ligaments
Limbs, Upper
  Lower
Liver
  Minute structure of
  Blood supply of
  Functions of
  Effect of alcohol on
Lungs
  Minute structure of
  Capacity of
  Effect of alcohol on
  Bleeding from
Lymph
Lymphatics

Mad dogs, Bites of
Malar bone
Mastication
Maxillary, Superior
  Inferior
Meals, Hints about
Meats as food
Medulla oblongata
Membrane, Synovial
  Serous
  Arachnoid
Membranes, Brain
Mesentery
Metabolism defined
Metacarpal bones
Metatarsal bones
Microscope, Use of
Milk
Mineral foods
Morphology defined
Motion in animals
Mouth
Movement, Mechanism of
Muscles, Kinds of
  voluntary, Structure of
  involuntary, Structure of
  Arrangement of
  Important
  Effect of alcohol on
  Effect of tobacco on
  Review analysis of
  Rest for
Muscular tissue, Effect of alcohol on
  Changes in
  Properties of
  activity
  contraction
  fatigue
  sense
Myopia

Nails
  Care of
Nasal bones
Nerve cells
  fibers
  cells and fibers, Function of
Nerves, Cranial
  Spinal
  Motor
  Sensory
  spinal, Functions of
Nervous system, General view of
  compared to telegraph system
  Divisions of
  Effect of alcohol on
  Effect of tobacco on
Nitrogenous foods.
Non-proteid vegetable foods
  animal foods
Nose, Bleeding from
  Foreign bodies in

Occipital bone
Œsophagus
Opium
  Poisonous effects of
  In patent medicines
  Victim of the, habit
Organic compounds
Outdoor games
Oxidation

Pain, Sense of
Palate bones
Pancreas
Pancreatic juice
Parietal bones
Patella
Pepsin
Pericardium
Periosteum
Peritoneum
Phalanges
Pharynx and œsophagus
Physical exercise
Physical education in school
Physical exercises in school
Physiology defined
  Study of
  what it should teach
  Main problems of, briefly stated.
Physiological knowledge, Value of
Pia mater
Pneumogastric nerve
Poisons
Poisons, Table of
  Antidotes for
  Practical points about
Poisoning, Treatment of
Portal circulation
Portal vein
Presbyopia
Pressure, Where to apply
Proteids
Proteid vegetable foods
Protoplasm
Pulmonary artery
  veins
Pulmonary infection
Pulse
Pupil of the eye

Radius
Receptaculum chyli
Rectum
Reflex centers
  in the brain
Reflex action, Importance of
Renal secretion
Residual air
Respiration, Nature and object of
  Nervous control of
  Effect of, on the blood
  Effect of, on the air
  Modified movements of
  Effect of alcohol on
  Effect of tobacco on
  artificial, Methods of
Rest, for the muscles
  Need of
  Benefits of
  The Sabbath, a day of
  of mind and body
Retina
Ribs and sternum

Saline or mineral foods
Saliva
Salt as food
Salts, Inorganic, in the body
Scalds or burns
Scapula
School, Physical education in
  Positions at
School and physical education
Secretion
Semicircular canals
Sensations, General
Sensation, Conditions of
Sense, Organs of
Sense organ, The essentials of
Serous membranes
Sick-room, Arrangement of
  Ventilation of
  Hints for
  Rules for
Sighing
Sight, Sense of
Skating, swimming, and rowing
Skeleton
  Review analysis of
Skeleton and manikin, Use of
Skin, The
  regulating temperature
  Action of, how modified
  Absorbent powers of
  and the kidneys
Skull
  Sutures of
Sleep, a periodical rest
  Effect of, on bodily functions
  Amount of, required
  Practical rules about
Smell
  Sense of
Sneezing
Snoring
Sobbing
Special senses
Speech
Sphenoid bone
Spinal column
Spinal cord
  Structure of
  Functions of
  conductor of impulses
  as a reflex center
Spinal nerves
  Functions of
Spleen
Sprains and dislocations
Stammering
Starches and sugars
Sternum
Stomach
  Coats of
  Digestion in
  Effect of alcohol on
  Bleeding from
Strabismus
Stuttering
Sunstroke
Supplemental air
Suprarenal capsules
Sutures of skull
Sweat glands
Sweat, Nature of
Sylvester method for apparent drowning
Sympathetic system
  Functions of
Synovial membrane
  sheaths and sacs

Taste, Organ of
  Sense of
Taste, Physiological conditions of
  Modifications of the sense
  Effect of alcohol on
  Effect of tobacco on
Tea
Tear gland and tear passages
Tears
Technical terms defined
Teeth
  Development of
  Structure of
  Proper care of
  Hints about saving
Temperature, Regulation of bodily
  Skin as a regulator of
  Voluntary regulation of
  Sense of
Temporal bones
Tendon of Achilles
Tendons
Thigh
Thoracic duct
Throat
  Care of
  Effect of alcohol on
  Effect of tobacco on
  Foreign bodies in
Thymus gland
Thyroid gland
Tibia
Tidal air
Tissue, White fibrous
  Connective
  Yellow elastic
  Areolar
  Adipose
  Adenoid
  Muscular
Tissues, Epithelial
Tissues, epithelial, Varieties of
  Functions of
  Connective
Tobacco, Effect of, on bones
  Effect of, on muscles
  Effect of, on physical culture
  Effect of, on digestion
  Effect of, on the heart
  Effect of, on the lungs
  Effect of, on the nervous system
  Effect of, on the mind
  Effect of, on the character
  Effect of, on taste
  Effect of, on hearing
  Effect of, on throat and voice
Touch, Organ of
  Sense of
Trachea
Trunk, Bones of
Tympanum, Cavity of

Ulna
Urine

Valve, Mitral
Valves of the heart
Valves, Tricuspid
  Semilunar
Vegetable foods
Veins
Ventilation
  Conditions of efficient
  of sick-room
Vestibule of ear
Vermiform appendix
Vision, Common defects of
  Effect of tobacco on
Vivisection and dissection
Vocal cords
Voice, Mechanism of
  Factors in the production of
  Care of
  Effect of alcohol on
  Effect of tobacco on
Vowel sounds

Walking, jumping, and running
Waste and repair
Waste material, Nature of
Waste products, Elimination of
Water as food
Whispering
Wounds, Incised and lacerated

Yawning




Footnotes:



[1] The Value of Physiological Knowledge. "If any one doubts the
importance of an acquaintance with the fundamental principles of
physiology as a means to complete living, let him look around and see how
many men and women he can find in middle life, or later, who are
thoroughly well. Occasionally only do we meet with an example of vigorous
health continued to old age; hourly do we meet with examples of acute
disorder, chronic ailment, general debility, premature decrepitude.
Scarcely is there one to whom you put the question, who has not, in the
course of his life, brought upon himself illness from which a little
knowledge would have saved him. Here is a case of heart disease consequent
on a rheumatic fever that followed a reckless exposure. There is a case of
eyes spoiled for life by overstudy.

"Not to dwell on the natural pain, the gloom, and the waste of time and
money thus entailed, only consider how greatly ill health hinders the
discharge of all duties,--makes business often impossible, and always more
difficult; produces irritability fatal to the right management of
children, puts the functions of citizenship out of the question, and makes
amusement a bore. Is it not clear that the physical sins--partly our
ancestors' and partly our own--which produce this ill health deduct more
from complete living than anything else, and to a great extent make life a
failure and a burden, instead of a benefaction and a pleasure?"--Herbert
Spencer.

[2] The word protoplasm must not be misunderstood to mean a substance of a
definite chemical nature, or of an invariable morphological structure; it
is applied to any part of a cell which shows the properties of life, and
is therefore only a convenient abbreviation for the phrase "mass of living
matter."

[3] "Did we possess some optic aid which should overcome the grossness of
our vision, so that we might watch the dance of atoms in the double
process of making and unmaking in the living body, we should see the
commonplace, lifeless things which are brought by the blood, and which we
call food, caught up into and made part of the molecular whorls of the
living muscle, linked together for a while in the intricate figures of the
dance of life, giving and taking energy as they dance, and then we should
see how, loosing hands, they slipped back into the blood as dead, inert,
used-up matter."--Michael Foster, Professor of Physiology in the
University of Cambridge, England.

[4] "Our material frame is composed of innumerable atoms, and each
separate and individual atom has its birth, life, and death, and then its
removal from the 'place of the living.' Thus there is going on a
continuous process of decay and death among the individual atoms which
make up each tissue. Each tissue preserves its vitality for a limited
space only, is then separated from the tissue of which it has formed a
part, and is resolved into its inorganic elements, to be in due course
eliminated from the body by the organs of excretion."--Maclaren's
_Physical Education_.

[5] The periosteum is often of great practical importance to the surgeon.
Instances are on record where bones have been removed, leaving the
periosteum, within which the entire bone has grown again. The importance
of this remarkable tissue is still farther illustrated by experiments upon
the transplantation of this membrane in the different tissues of living
animals, which has been followed by the formation of bone in these
situations. Some years ago a famous surgeon in New York removed the whole
lower jawbone from a young woman, leaving the periosteum and even
retaining in position the teeth by a special apparatus. The entire jawbone
grew again, and the teeth resumed their original places as it grew.

[6] The mechanism of this remarkable effect is clearly shown by an
experiment which the late Dr. Oliver Wendell Holmes used to take delight
in performing in his anatomical lectures at the Harvard Medical College.
He had a strong iron bar made into a ring of some eight inches in
diameter, with a space left between the ends just large enough to be
filled by an English walnut. The ring was then dropped to the floor so as
to strike on the convexity just opposite to the walnut, which invariably
was broken to pieces.

[7] For the treatment of accidents and emergencies which may occur with
reference to the bones, see Chapter XIII.

[8] "Besides the danger connected with the use of alcoholic drinks which
is common to them with other narcotic poisons, alcohol retards the growth
of young cells and prevents their proper development. Now, the bodies of
all animals are made up largely of cells, ... and the cells being the
living part of the animal, it is especially important that they should not
be injured or badly nourished while they are growing. So that alcohol in
all its forms is particularly injurious to young persons, as it retards
their growth, and stunts both body and mind. This is the theory of Dr.
Lionel S. Beale, a celebrated microscopist and thinker, and is quite
generally accepted."--Dr. Roger S. Tracy, of the New York Board of Health.

[9] "In its action on the system nicotine is one of the most powerful
poisons known. A drop of it in a concentrated form was found sufficient to
kill a dog, and small birds perished at the approach of a tube containing
it."--Wood's _Materia Medica_.

"Tobacco appears to chiefly affect the heart and brain, and I have
therefore placed it among cerebral and cardiac poisons."--Taylor's
_Treatise on Poisons_.

[10] "Certain events occur in the brain; these give rise to other events,
to changes which travel along certain bundles of fibers called nerves, and
so reach certain muscles. Arrived at the muscles, these changes in the
nerves, which physiologists call nervous impulses, induce changes in the
muscles, by virtue of which these shorten contract, bring their ends
together, and so, working upon bony levers, bend the arm or hand, or lift
the weight."--Professor Michael Foster.

[11] The synovial membranes are almost identical in structure with serous
membranes (page 176), but the secretion is thicker and more like the
white of egg.

[12] "Smoking among students or men training for contests is a mistake. It
not only affects the wind, but relaxes the nerves in a way to make them
less vigorous for the coming contest. It shows its results at once, and
when the athlete is trying to do his best to win he will do well to avoid
it." Joseph Hamblen Sears, Harvard Coach, and Ex-Captain of the Harvard
Football Team, Article in _In Sickness and in Health_.

[13] "There is no profession, there is no calling or occupation in which
men can be engaged, there is no position in life, no state in which a man
can be placed, in which a fairly developed frame will not be valuable to
him; there are many of these, even the most purely and highly
intellectual, in which it is essential to success--essential simply as a
means, material, but none the less imperative, to enable the mind to do
its work. Year by year, almost day by day, we see men (and women) falter
and fail in the midst of their labors; ... and all for want of a little
bodily stamina--a little bodily power and bodily capacity for the
endurance of fatigue, or protracted unrest, or anxiety, or
grief."--Maclaren's _Physical Education_.

[14] "One half the struggle of physical training has been won when a boy
can be induced to take a genuine interest in his bodily condition,--to
want to remedy its defects, and to pride himself on the purity of his
skin, the firmness of his muscles, and the uprightness of his figure.
Whether the young man chooses afterwards to use the gymnasium, to run, to
row, to play ball, or to saw wood, for the purpose of improving his
physical condition, matters little, provided he accomplishes that
object."--Dr. D. A. Sargent, Director of the Hemenway Gymnasium at Harvard
University.

[15] "It is _health_ rather than _strength_ that is the great requirement
of modern men at modern occupations; it is not the power to travel great
distances, carry great burdens, lift great weights, or overcome great
material obstructions; it is simply that condition of body, and that
amount of vital capacity, which shall enable each man in his place to
pursue his calling, and work on in his working life, with the greatest
amount of comfort to himself and usefulness to his fellowmen."--Maclaren's
_Physical Education_.

[16] To this classification may be added what are called albuminoids, a
group of bodies resembling proteids, but having in some respects a
different nutritive value. Gelatine, such as is found in soups or table
gelatine is a familiar example of the albuminoids. They are not found to
any important extent in our raw foods, and do not therefore usually appear
in the analyses of the composition of foods. The albuminoids closely
resemble the proteids, but cannot be used like them to build up
protoplasm.

[17] The amount of water in various tissues of the body is given by the
following table in parts of 1000:

         Solids.                  Liquids.
  Enamel,            2       Blood,         791
  Dentine,         100       Bile,          864
  Bone,            486       Blood plasma,  901
  Fat,             299       Chyle,         928
  Cartilage,       550       Lymph,         958
  Liver,           693       Serum,         959
  Skin,            720       Gastric juice, 973
  Brain,           750       Tears,         982
  Muscle,          757       Saliva,        995
  Spleen,          758       Sweat,         995
  Kidney,          827
  Vitreous humor,  987

[18] The work of some kinds of moulds may be apparent to the eye, as in
the growths that form on old leather and stale bread and cheese. That of
others goes on unseen, as when acids are formed in stewed fruits.
Concerning the work of the different kinds of moulds. Troussart says:
"_Mucor mucedo_ devours our preserves; _Ascophora mucedo_ turns our bread
mouldy; _Molinia_ is nourished at the expense of our fruits; _Mucor
herbarium_ destroys the herbarium of the botanist; and _Choetonium
chartatum_ develops itself on paper, on the insides of books and on their
bindings, when they come in contact with a damp wall."--Troussart's
_Microbes, Ferments, and Moulds_.

[19] "The physiological wear of the organism is constantly being repaired
by the blood; but in order to keep the great nutritive fluid from becoming
impoverished, the matters which it is constantly losing must be supplied
from some source out of the body, and this necessitates the ingestion of
articles which are known as food."--Flint's _Text-book of Human
Physiology_.

[20] Glands. Glands are organs of various shapes and sizes, whose
special work it is to separate materials from the blood for further use in
the body, the products being known as secretion and excretion.
The means by which secretion and excretion are effected are, however,
identical. The essential parts of a gland consist of a basement membrane,
on one side of which are found actively growing cells, on the other is the
blood current, flowing in exceedingly thin-walled vessels known as the
capillaries. The cells are able to select from the blood whatever material
they require and which they elaborate into the particular secretion. In
Fig. 47 is illustrated, diagrammatically, the structure of a few typical
secreting glands. The continuous line represents the basement membrane.
The dotted line represents the position of the cells on one side of the
basement membrane. The irregular lines show the position of the
blood-vessels.

[21] Tablets and other material for Fehling and additional tests for sugar
can be purchased at a drug store. The practical details of these and other
tests which assume some knowledge of chemistry, should be learned from
some manual on the subject.

[22] The Peritoneum. The intestines do not lie in a loose mass in the
abdominal cavity. Lining the walls of this cavity, just as in a general
way, a paper lines the walls of a room, is a delicate serous membrane,
called the peritoneum. It envelops, in a greater or less degree, all
the viscera in the cavity and forms folds by which they are connected with
each other, or are attached to the posterior wall. Its arrangement is
therefore very complicated. When the peritoneum comes in contact with the
large intestine, it passes over it just as the paper of a room would pass
over a gas pipe which ran along the surface of the wall, and in passing
over it binds it down to the wall of the cavity. The small intestines are
suspended from the back wall of the cavity by a double fold of the
peritoneum, called the mesentery. The bowels are also protected from
external cold by several folds of this membrane loaded with fat. This is
known as the _great omentum_.

The peritoneum, when in health, secretes only enough fluid to keep its
surface lubricated so that the bowels may move freely and smoothly on each
other and on the other viscera. In disease this fluid may increase in
amount, and the abdominal cavity may become greatly distended. This is
known as _ascites_ or dropsy.

[23] The human bile when fresh is generally of a bright golden red,
sometimes of a greenish yellow color. It becomes quite green when kept,
and is alkaline in reaction. When it has been omited it is distinctly
yellow, because of its action on the gastric juice. The bile contains a
great deal of coloring matter, and its chief ingiedients are two salts of
soda, sodium taurocholate and glycocholate.

[24] Nansen emphasizes this point in his recently published work,
_Farthest North_.

[25] We should make it a point not to omit a meal unless forced to do so.
Children, and even adults, often have the habit of going to school or to
work in a hurry, without eating any breakfast. There is almost sure to be
a fainting, or "all-gone" feeling at the stomach before another mealtime.
This habit is injurious, and sure to produce pernicious results.

[26] The teeth of children should be often examined by the dentist,
especially from the beginning of the second dentition, at about the sixth
year, until growth is completed. In infancy the mother should make it a
part of her daily care of the child to secure perfect cleanliness of the
teeth. The child thus trained will not, when old enough to rinse the mouth
properly or to use the brush, feel comfortable after a meal until the
teeth have been cleansed. The habit thus formed is almost sure to be
continued through life.

[27] "If the amount of alcohol be increased, or the repetition become
frequent, some part of it undergoes acid fermentation in the stomach, and
acid eructations or vomitings occur. With these phenomena are associated
catarrh of the stomach and liver with its characteristic symptoms,--loss
of appetite, feeble digestion, sallowness, mental depression, and
headache."--James C. Wilson, Professor in the Jefferson Medical College,
Philadelphia.

"Man has recourse to alcohol, not for the minute quantity of energy which
may be supplied by itself, but for its powerful influence on the
distribution of the energy furnished by other things. That influence is a
very complex one."--Professor Michael Foster.

[28] "When constantly irritated by the direct action of alcoholic drinks,
the stomach gradually undergoes lasting structural changes. Its vessels
remain dilated and congested, its connective tissue becomes excessive, its
power of secreting gastric juice diminishes, and its mucous secretions
abnormally abundant."--H. Newell Martin, late Professor of Physiology in
Johns Hopkins University.

"Chemical experiments have demonstrated that the action of alcohol on the
digestive fluids is to destroy its active principle, the pepsin, thus
confirming the observations of physiologists that its use gives ride to
the most serious disorders of the stomach and the most malignant
aberrations of the entire economy."--Professor E. C. Youmans, author of
standard scientific works.

"The structural changes induced by habitual use of alcohol and the action
of this agent on the pepsin, seriously impair the digestive power. Hence
it is, that those who are habitual consumers of alcoholic fluids suffer
from disorders o digestion."--Robert Bartholow, recently Professor of
Materia Medica in the University of Pennsylvania.

"Alcohol in any appreciable quantity diminishes the solvent power of the
gastric fluid so as to interfere with the process of digestion instead of
aiding it."--Professor W. B. Carpenter, the eminent English physiologist.

[29] "Cirrhosis of the liver is notoriously frequent among drunkards, and
is in fact almost, though not absolutely, confined to them."--Robert T.
Edes, formerly Professor of Materia Medica in Harvard Medical College.

"Alcohol acts on the liver by producing enlargement of that organ, and a
fat deposit, or 'hob-nailed' liver mentioned by the English
writers."--Professor W. B. Carpenter.

[30] Preparation of Artificial Gastric Juice. _(a)_ Take part of the
cardiac end of the pig's stomach, which has been previously opened and
washed rapidly in cold water, and spread it, mucous surface upwards, on
the convex surface of an inverted capsule. Scrape the mucous surface
firmly with the back of a knife blade, and rub up the scrapings in a
mortar with fine sand. Add water, and rub up the whole vigorously for some
time, and filter. The filtrate is an artificial gastric juice.

_(b)_ From the cardiac end of a pig's stomach detach the mucous membrane
in shreds, dry them between folds of blotting-paper, place them in a
bottle, and cover them with strong glycerine for several days. The
glycerine dissolves the pepsin, and on filtering, a glycerine extract with
high digestive properties is obtained.

These artificial juices, when added to hydrochloric acid of the proper
strength, have high digestive powers.

Instead of _(a)_ or _(b)_ use the artificial pepsin prepared for the
market by the wholesale manufacturers of such goods.

[31] The cause of the clotting of blood is not yet fully understood.
Although the process has been thoroughly investigated we have not yet a
satisfactory explanation why the circulating blood does not clot in
healthy blood-vessels. The ablest physiologists of our day do not, as
formerly, regard the process as a so-called vital, but a purely chemical
one.

[32] Serous Membranes.--The serous membranes form shut sacs, of which
one portion is applied to the walls of the cavity which it lines; the
other is reflected over the surface of the organ or organs contained in
the cavity. The sac is completely closed, so that no communication exists
between the serous cavity and the parts in its neighborhood. The various
serous membranes are the _pleura_ which envelops the lungs; the
_pericardium_ which surrounds the heart; the _peritoneum_ which invests
the viscera of the abdomen, and the _arachnoid_ in the spinal canal and
cranial cavity. In health the serous membranes secrete only sufficient
fluid to lubricate and keep soft and smooth the opposing surfaces.

[33] A correct idea may be formed of the arrangement of the pericardium
around the heart by recalling how a boy puts on and wears his toboggan
cap. The pericardium encloses the heart exactly as this cap covers the
boy's head.

[34] "Alcohol taken in small and single doses, acts almost exclusively on
the brain and the blood-vessels of the brain, whereas taken in large and
repeated doses its chief effects are always nervous effects. The first
effects of alcohol on the function of inhibition are to paralyze the
controlling nerves, so that the blood-centers are dilated, and more blood
is let into the brain. In consequence of this flushing of the brain, its
nerve centers are asked to do more work."--Dr. T. S. Clouston, Medical
Superintendent of the Royal Asylum, Edinburgh.

"Alcoholic drinks prevent the natural changes going on in the blood, and
obstruct the nutritive and reparative functions."--Professor E. L.
Youmans, well-known scientist and author of _Class Book of Chemistry_.

[35] The word "cell" is not used in this connection in its technical
signification of a histological unit of the body (sec. 12), but merely in
its primary sense of a small cavity

[36] "The student must guard himself against the idea that arterial blood
contains no carbonic acid, and venous blood no oxygen. In passing through
the lungs venous blood loses only a part of its carbonic acid; and
arterial blood, in passing through the tissues, loses only a part of its
oxygen. In blood, however venous, there is in health always some oxygen;
and in even the brightest arterial blood there is actually more carbonic
acid than oxygen."--T. H. Huxley.

[37] "Consumption is a disease which can be taken from others, and is not
simply caused by colds. A cold may make it easier to take the disease. It
is usually caused by germs which enter the body with the air breathed. The
matter which consumptives cough or spit up contains these germs in great
numbers--frequently millions are discharged in a single day. This matter
spit upon the floor, wall, or elsewhere is apt to dry, become pulverized,
and float in the air as dust. The dust contains the germs, and thus they
enter the body with the air breathed. The breath of a consumptive does not
contain the germs and will not produce the disease. A well person catches
the disease from a consumptive only by in some way taking in the matter
coughed up by the consumptive."--Extract from a circular issued by the
Board of Health of New York City.

[38] "The lungs from the congested state of their vessels produced by
alcohol are more subject to the influence of cold, the result being
frequent attacks of bronchitis. It has been recognized of late years that
there is a peculiar form of consumption of the lungs which is very rapidly
fatal and found only in alcohol drinkers."--Professor H. Newell Martin.

[39] "The relation to Bright's Disease is not so clearly made out as is
assumed by some writers, though I must confess to myself sharing the
popular belief that alcohol is one among its most important
factors."--Robert T. Edes, M.D.

[40] Thus the fibers which pass out from the sacral plexus in the loins,
and extend by means of the great sciatic nerve and its branches to the
ends of the toes, may be more than a yard long.

[41] Remarkable instances are cited to illustrate the imperative demand
for sleep. Gunner boys have been known to fall asleep during the height of
a naval battle, owing to the fatigue occasioned by the arduous labor in
carrying ammunition for the gunner. A case is reported of a captain of a
British frigate who fell asleep and remained so for two hours beside one
of the largest guns of his vessel, the gun being served vigorously all the
time. Whole companies of men have been known to sleep while on the march
during an arduous campaign. Cavalrymen and frontiersmen have slept soundly
in the saddle during the exhausting campaigns against the Indians.

[42] According to the Annual Report of New York State Reformatory, for
1896, drunkenness among the inmates can be clearly traced to no less than
38 per cent of the fathers and mothers only.

Drunkenness among the parents of 38 per cent of the prisoners in a
reformatory of this kind is a high and a serious percentage. It shows that
the demoralizing influence of drink is apt to destroy the future of the
child as well as the character of the parent.

"There is a marked tendency in nature to transmit all diseased conditions.
Thus the children of consumptive parents are apt to be consumptive. But,
of all agents, alcohol is the most potent in establishing a heredity that
exhibits itself in the destruction of mind and body. There is not only a
propensity transmitted, but an actual disease of the nervous system."--Dr.
Willard Parker.

[43] "It is very certain that many infants annually perish from this
single cause."--Reese's _Manual of Toxicology_.

[44] If an eye removed from its socket be stripped posteriorly of the
sclerotic coat, an inverted image or the field of view will be seen on the
retina; but if the lens or other part of the refractive media be removed,
the image will become blurred or disappear altogether.

[45] This change in the convexity of the lens is only a slight one, as the
difference in the focal point between rays from an object twenty feet
distant and one four inches distant is only one-tenth of an inch. While
this muscular action is taking place, the pupil contracts and the eyeballs
converge by the action of the internal rectus muscles. These three acts
are due to the third nerve (the motor oculi). This is necessary in order
that each part should he imprinted on the same portion of the retina,
otherwise there would be double vision.

[46] The Germans have a quaint proverb that one should never rub his eyes
except with his elbows

[47] "The deleterious effect of tobacco upon eyesight is an acknowledged
fact. The Belgian government instituted an investigation into the cause of
the prevalence of color-blindness. The unanimous verdict of the experts
making the examination was that the use of tobacco was one of the
principal causes of this defect of vision.

"The dimness of sight caused by alcohol or tobacco has long been
clinically recognized, although not until recently accurately understood.
The main facts can now be stated with much assurance, since the
publication of an article by Uhthoff which leaves little more to be said.
He examined one thousand patients who were detained in hospital because of
alcoholic excess, and out of these found a total of eye diseases of about
thirty per cent.

"Commonly both eyes are affected, and the progress of the disease is slow,
both in culmination and in recovery.... Treatment demands entire
abstinence."--Henry D. Noyes, Professor of Otology in the Bellevue
Hospital Medical College, New York.

[48] "The student who will take a little trouble in noticing the ears of
the persons whom he meets from day to day will be greatly interested and
surprised to see how much the auricle varies. It may be a thick and clumsy
ear or a beautifully delicate one; long and narrow or short and broad, may
have a neatly formed and distinct lobule, or one that is heavy, ungainly,
and united to the cheek so as hardly to form a separate part of the
auricle, may hug the head closely or flare outward so as to form almost
two wings to the head. In art, and especially in medallion portraits, in
which the ear is a marked (because central) feature, the auricle is of
great importance"--William W. Keen, M.D., editor of Gray's _Anatomy_

[49] The organ of Corti is a very complicated structure which it is
needless to describe in this connection. It consists essentially of
modified ephithelial cells floated upon the auditory epithelium, or
basilar membrane, of the cochlea. There is a series of fibers, each made
of two parts sloped against each other like the rafters of a roof. It is
estimated that there are no less than 3000 of these arches in the human
ear, placed side by side in a continuous series along the whole length of
the basilar membrane. Resting on these arches are numbers of conical
epithelial cells, from the free surface of which bundles of stiff hairs
(cilia) project. The fact that these hair-cells are connected with the
fibers of the cochlear division of the auditory nerve suggests that they
must play an important part in auditory sensation.

[50] The voices of boys "break," or "change," because of the sudden growth
or enlargement of the larynx, and consequent increase in length of the
vocal cords, at from fourteen to sixteen years of age. No such enlargement
takes place in the larynxes of girls: therefore their voices undergo no
such sudden change.

[51] This experiment and several others in this book, are taken from
Professor Bowditch's little book called _Hints for Teachers of
Physiology_, a work which should be mastered by every teacher of
physiology in higher schools.

[52] The teacher or student who is disposed to study the subject more
thoroughly and in more detail than is possible in a class text-book, will
find all that is needed in the following excellent books, which are
readily obtained by purchase, or may be found in the public libraries of
larger towns: Dulles' _Accidents and Emergencies;_ Pilcher's _First Aid in
Illness and Injury_; Doty's _Prompt Aid to the Injured;_ and Johnston's
"Surgical Injuries and Surgical Diseases," a special article in
Roosevelt's _In Sickness and in Health_.

[53] "A tourniquet is a bandage, handkerchief, or strap of webbing, into
the middle of which a stone, a potato, a small block of wood, or any hard,
smooth body is tied. The band is tied loosely about the limb, the hard
body is held over the artery to be constricted, and a stick is inserted
beneath the band on the opposite side of the limb and used to twist the
band in such a way that the limb is tightly constricted thereby, and the
hard body thus made to compress the artery (Fig. 160).

"The entire circumference of the limb may be constricted by any sort of
elastic band or rubber tube, or any other strong elastic material passed
around the limb several times on a stretch, drawn tight and tied in a
knot. In this way, bleeding may be stopped at once from the largest
arteries. The longer and softer the tube the better. It requires no skill
and but little knowledge of anatomy to apply it efficiently." Alexander B.
Johnson, Surgeon to Roosevelt Hospital, New York City.

[54] Corrosive sublimate is probably the most powerful disinfectant known.
A solution of one part in 2000 will destroy microscopic organisms. Two
teaspoonfuls of this substance will make a solution strong enough to kill
all disease germs.

[55] The burning of sulphur produces sulphurous acid, which is an
irrespirable gas. The person who lights the sulphur must, therefore,
immediately leave the room, and after the lapse of the proper time, must
hold his breath as he enters the room to open the windows and let out the
gas. After fumigation, plastered walls should be white-washed, the
woodwork well scrubbed with carbolic soap, and painted portions repainted.

[56] Put copperas in a pail of water, in such quantity that some may
constantly remain undissolved at the bottom. This makes a saturated
solution. To every privy or water-closet, allow one pint of the solution
for every four persons when cholera is about. To keep privies from being
offensive, pour one pint into each seat, night and morning.

[57] "While physiology is one of the biological sciences, it should be
clearly recognized that it is not, like botany or zoology, a science of
observation and description; but rather, like physics or chemistry, a
science of experiment. While the amount of experimental instruction (not
involving vivisection or experiment otherwise unsuitable) that may with
propriety be given in the high school is neither small nor unimportant,
the limitations to such experimental teaching, both as to kind and as to
amount, are plainly indicated.

"The obvious limitations to experimental work in physiology in the high
school, already referred to, make it necessary for the student to acquire
much of the desired knowledge from the text-book only. Nevertheless, much
may be done by a thoughtful and ingenious teacher to make such knowledge
real, by the aid of suitable practical exercises and
demonstrations."--_Report of the Committee of Ten on Secondary School
Studies_.

[58] This ingenious and excellent experiment is taken from the _New York
School Journal_ for May, 1897, for which paper it was prepared by Charles
D. Nason, of Philadelphia.





End of Project Gutenberg's A Practical Physiology, by Albert F. Blaisdell

*** END OF THIS PROJECT GUTENBERG EBOOK A PRACTICAL PHYSIOLOGY ***

***** This file should be named 10453-0.txt or 10453-0.zip *****
This and all associated files of various formats will be found in:
        https://www.gutenberg.org/1/0/4/5/10453/

Produced by Distributed Proofreaders

Updated editions will replace the previous one--the old editions
will be renamed.

Creating the works from public domain print editions means that no
one owns a United States copyright in these works, so the Foundation
(and you!) can copy and distribute it in the United States without
permission and without paying copyright royalties.  Special rules,
set forth in the General Terms of Use part of this license, apply to
copying and distributing Project Gutenberg-tm electronic works to
protect the PROJECT GUTENBERG-tm concept and trademark.  Project
Gutenberg is a registered trademark, and may not be used if you
charge for the eBooks, unless you receive specific permission.  If you
do not charge anything for copies of this eBook, complying with the
rules is very easy.  You may use this eBook for nearly any purpose
such as creation of derivative works, reports, performances and
research.  They may be modified and printed and given away--you may do
practically ANYTHING with public domain eBooks.  Redistribution is
subject to the trademark license, especially commercial
redistribution.



*** START: FULL LICENSE ***

THE FULL PROJECT GUTENBERG LICENSE
PLEASE READ THIS BEFORE YOU DISTRIBUTE OR USE THIS WORK

To protect the Project Gutenberg-tm mission of promoting the free
distribution of electronic works, by using or distributing this work
(or any other work associated in any way with the phrase "Project
Gutenberg"), you agree to comply with all the terms of the Full Project
Gutenberg-tm License (available with this file or online at
https://gutenberg.org/license).


Section 1.  General Terms of Use and Redistributing Project Gutenberg-tm
electronic works

1.A.  By reading or using any part of this Project Gutenberg-tm
electronic work, you indicate that you have read, understand, agree to
and accept all the terms of this license and intellectual property
(trademark/copyright) agreement.  If you do not agree to abide by all
the terms of this agreement, you must cease using and return or destroy
all copies of Project Gutenberg-tm electronic works in your possession.
If you paid a fee for obtaining a copy of or access to a Project
Gutenberg-tm electronic work and you do not agree to be bound by the
terms of this agreement, you may obtain a refund from the person or
entity to whom you paid the fee as set forth in paragraph 1.E.8.

1.B.  "Project Gutenberg" is a registered trademark.  It may only be
used on or associated in any way with an electronic work by people who
agree to be bound by the terms of this agreement.  There are a few
things that you can do with most Project Gutenberg-tm electronic works
even without complying with the full terms of this agreement.  See
paragraph 1.C below.  There are a lot of things you can do with Project
Gutenberg-tm electronic works if you follow the terms of this agreement
and help preserve free future access to Project Gutenberg-tm electronic
works.  See paragraph 1.E below.

1.C.  The Project Gutenberg Literary Archive Foundation ("the Foundation"
or PGLAF), owns a compilation copyright in the collection of Project
Gutenberg-tm electronic works.  Nearly all the individual works in the
collection are in the public domain in the United States.  If an
individual work is in the public domain in the United States and you are
located in the United States, we do not claim a right to prevent you from
copying, distributing, performing, displaying or creating derivative
works based on the work as long as all references to Project Gutenberg
are removed.  Of course, we hope that you will support the Project
Gutenberg-tm mission of promoting free access to electronic works by
freely sharing Project Gutenberg-tm works in compliance with the terms of
this agreement for keeping the Project Gutenberg-tm name associated with
the work.  You can easily comply with the terms of this agreement by
keeping this work in the same format with its attached full Project
Gutenberg-tm License when you share it without charge with others.

1.D.  The copyright laws of the place where you are located also govern
what you can do with this work.  Copyright laws in most countries are in
a constant state of change.  If you are outside the United States, check
the laws of your country in addition to the terms of this agreement
before downloading, copying, displaying, performing, distributing or
creating derivative works based on this work or any other Project
Gutenberg-tm work.  The Foundation makes no representations concerning
the copyright status of any work in any country outside the United
States.

1.E.  Unless you have removed all references to Project Gutenberg:

1.E.1.  The following sentence, with active links to, or other immediate
access to, the full Project Gutenberg-tm License must appear prominently
whenever any copy of a Project Gutenberg-tm work (any work on which the
phrase "Project Gutenberg" appears, or with which the phrase "Project
Gutenberg" is associated) is accessed, displayed, performed, viewed,
copied or distributed:

This eBook is for the use of anyone anywhere at no cost and with
almost no restrictions whatsoever.  You may copy it, give it away or
re-use it under the terms of the Project Gutenberg License included
with this eBook or online at www.gutenberg.org

1.E.2.  If an individual Project Gutenberg-tm electronic work is derived
from the public domain (does not contain a notice indicating that it is
posted with permission of the copyright holder), the work can be copied
and distributed to anyone in the United States without paying any fees
or charges.  If you are redistributing or providing access to a work
with the phrase "Project Gutenberg" associated with or appearing on the
work, you must comply either with the requirements of paragraphs 1.E.1
through 1.E.7 or obtain permission for the use of the work and the
Project Gutenberg-tm trademark as set forth in paragraphs 1.E.8 or
1.E.9.

1.E.3.  If an individual Project Gutenberg-tm electronic work is posted
with the permission of the copyright holder, your use and distribution
must comply with both paragraphs 1.E.1 through 1.E.7 and any additional
terms imposed by the copyright holder.  Additional terms will be linked
to the Project Gutenberg-tm License for all works posted with the
permission of the copyright holder found at the beginning of this work.

1.E.4.  Do not unlink or detach or remove the full Project Gutenberg-tm
License terms from this work, or any files containing a part of this
work or any other work associated with Project Gutenberg-tm.

1.E.5.  Do not copy, display, perform, distribute or redistribute this
electronic work, or any part of this electronic work, without
prominently displaying the sentence set forth in paragraph 1.E.1 with
active links or immediate access to the full terms of the Project
Gutenberg-tm License.

1.E.6.  You may convert to and distribute this work in any binary,
compressed, marked up, nonproprietary or proprietary form, including any
word processing or hypertext form.  However, if you provide access to or
distribute copies of a Project Gutenberg-tm work in a format other than
"Plain Vanilla ASCII" or other format used in the official version
posted on the official Project Gutenberg-tm web site (www.gutenberg.org),
you must, at no additional cost, fee or expense to the user, provide a
copy, a means of exporting a copy, or a means of obtaining a copy upon
request, of the work in its original "Plain Vanilla ASCII" or other
form.  Any alternate format must include the full Project Gutenberg-tm
License as specified in paragraph 1.E.1.

1.E.7.  Do not charge a fee for access to, viewing, displaying,
performing, copying or distributing any Project Gutenberg-tm works
unless you comply with paragraph 1.E.8 or 1.E.9.

1.E.8.  You may charge a reasonable fee for copies of or providing
access to or distributing Project Gutenberg-tm electronic works provided
that

- You pay a royalty fee of 20% of the gross profits you derive from
     the use of Project Gutenberg-tm works calculated using the method
     you already use to calculate your applicable taxes.  The fee is
     owed to the owner of the Project Gutenberg-tm trademark, but he
     has agreed to donate royalties under this paragraph to the
     Project Gutenberg Literary Archive Foundation.  Royalty payments
     must be paid within 60 days following each date on which you
     prepare (or are legally required to prepare) your periodic tax
     returns.  Royalty payments should be clearly marked as such and
     sent to the Project Gutenberg Literary Archive Foundation at the
     address specified in Section 4, "Information about donations to
     the Project Gutenberg Literary Archive Foundation."

- You provide a full refund of any money paid by a user who notifies
     you in writing (or by e-mail) within 30 days of receipt that s/he
     does not agree to the terms of the full Project Gutenberg-tm
     License.  You must require such a user to return or
     destroy all copies of the works possessed in a physical medium
     and discontinue all use of and all access to other copies of
     Project Gutenberg-tm works.

- You provide, in accordance with paragraph 1.F.3, a full refund of any
     money paid for a work or a replacement copy, if a defect in the
     electronic work is discovered and reported to you within 90 days
     of receipt of the work.

- You comply with all other terms of this agreement for free
     distribution of Project Gutenberg-tm works.

1.E.9.  If you wish to charge a fee or distribute a Project Gutenberg-tm
electronic work or group of works on different terms than are set
forth in this agreement, you must obtain permission in writing from
both the Project Gutenberg Literary Archive Foundation and Michael
Hart, the owner of the Project Gutenberg-tm trademark.  Contact the
Foundation as set forth in Section 3 below.

1.F.

1.F.1.  Project Gutenberg volunteers and employees expend considerable
effort to identify, do copyright research on, transcribe and proofread
public domain works in creating the Project Gutenberg-tm
collection.  Despite these efforts, Project Gutenberg-tm electronic
works, and the medium on which they may be stored, may contain
"Defects," such as, but not limited to, incomplete, inaccurate or
corrupt data, transcription errors, a copyright or other intellectual
property infringement, a defective or damaged disk or other medium, a
computer virus, or computer codes that damage or cannot be read by
your equipment.

1.F.2.  LIMITED WARRANTY, DISCLAIMER OF DAMAGES - Except for the "Right
of Replacement or Refund" described in paragraph 1.F.3, the Project
Gutenberg Literary Archive Foundation, the owner of the Project
Gutenberg-tm trademark, and any other party distributing a Project
Gutenberg-tm electronic work under this agreement, disclaim all
liability to you for damages, costs and expenses, including legal
fees.  YOU AGREE THAT YOU HAVE NO REMEDIES FOR NEGLIGENCE, STRICT
LIABILITY, BREACH OF WARRANTY OR BREACH OF CONTRACT EXCEPT THOSE
PROVIDED IN PARAGRAPH F3.  YOU AGREE THAT THE FOUNDATION, THE
TRADEMARK OWNER, AND ANY DISTRIBUTOR UNDER THIS AGREEMENT WILL NOT BE
LIABLE TO YOU FOR ACTUAL, DIRECT, INDIRECT, CONSEQUENTIAL, PUNITIVE OR
INCIDENTAL DAMAGES EVEN IF YOU GIVE NOTICE OF THE POSSIBILITY OF SUCH
DAMAGE.

1.F.3.  LIMITED RIGHT OF REPLACEMENT OR REFUND - If you discover a
defect in this electronic work within 90 days of receiving it, you can
receive a refund of the money (if any) you paid for it by sending a
written explanation to the person you received the work from.  If you
received the work on a physical medium, you must return the medium with
your written explanation.  The person or entity that provided you with
the defective work may elect to provide a replacement copy in lieu of a
refund.  If you received the work electronically, the person or entity
providing it to you may choose to give you a second opportunity to
receive the work electronically in lieu of a refund.  If the second copy
is also defective, you may demand a refund in writing without further
opportunities to fix the problem.

1.F.4.  Except for the limited right of replacement or refund set forth
in paragraph 1.F.3, this work is provided to you 'AS-IS," WITH NO OTHER
WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
WARRANTIES OF MERCHANTIBILITY OR FITNESS FOR ANY PURPOSE.

1.F.5.  Some states do not allow disclaimers of certain implied
warranties or the exclusion or limitation of certain types of damages.
If any disclaimer or limitation set forth in this agreement violates the
law of the state applicable to this agreement, the agreement shall be
interpreted to make the maximum disclaimer or limitation permitted by
the applicable state law.  The invalidity or unenforceability of any
provision of this agreement shall not void the remaining provisions.

1.F.6.  INDEMNITY - You agree to indemnify and hold the Foundation, the
trademark owner, any agent or employee of the Foundation, anyone
providing copies of Project Gutenberg-tm electronic works in accordance
with this agreement, and any volunteers associated with the production,
promotion and distribution of Project Gutenberg-tm electronic works,
harmless from all liability, costs and expenses, including legal fees,
that arise directly or indirectly from any of the following which you do
or cause to occur: (a) distribution of this or any Project Gutenberg-tm
work, (b) alteration, modification, or additions or deletions to any
Project Gutenberg-tm work, and (c) any Defect you cause.


Section  2.  Information about the Mission of Project Gutenberg-tm

Project Gutenberg-tm is synonymous with the free distribution of
electronic works in formats readable by the widest variety of computers
including obsolete, old, middle-aged and new computers.  It exists
because of the efforts of hundreds of volunteers and donations from
people in all walks of life.

Volunteers and financial support to provide volunteers with the
assistance they need, is critical to reaching Project Gutenberg-tm's
goals and ensuring that the Project Gutenberg-tm collection will
remain freely available for generations to come.  In 2001, the Project
Gutenberg Literary Archive Foundation was created to provide a secure
and permanent future for Project Gutenberg-tm and future generations.
To learn more about the Project Gutenberg Literary Archive Foundation
and how your efforts and donations can help, see Sections 3 and 4
and the Foundation web page at https://www.pglaf.org.


Section 3.  Information about the Project Gutenberg Literary Archive
Foundation

The Project Gutenberg Literary Archive Foundation is a non profit
501(c)(3) educational corporation organized under the laws of the
state of Mississippi and granted tax exempt status by the Internal
Revenue Service.  The Foundation's EIN or federal tax identification
number is 64-6221541.  Its 501(c)(3) letter is posted at
https://pglaf.org/fundraising.  Contributions to the Project Gutenberg
Literary Archive Foundation are tax deductible to the full extent
permitted by U.S. federal laws and your state's laws.

The Foundation's principal office is located at 4557 Melan Dr. S.
Fairbanks, AK, 99712., but its volunteers and employees are scattered
throughout numerous locations.  Its business office is located at
809 North 1500 West, Salt Lake City, UT 84116, (801) 596-1887, email
business@pglaf.org.  Email contact links and up to date contact
information can be found at the Foundation's web site and official
page at https://pglaf.org

For additional contact information:
     Dr. Gregory B. Newby
     Chief Executive and Director
     gbnewby@pglaf.org

Section 4.  Information about Donations to the Project Gutenberg
Literary Archive Foundation

Project Gutenberg-tm depends upon and cannot survive without wide
spread public support and donations to carry out its mission of
increasing the number of public domain and licensed works that can be
freely distributed in machine readable form accessible by the widest
array of equipment including outdated equipment.  Many small donations
($1 to $5,000) are particularly important to maintaining tax exempt
status with the IRS.

The Foundation is committed to complying with the laws regulating
charities and charitable donations in all 50 states of the United
States.  Compliance requirements are not uniform and it takes a
considerable effort, much paperwork and many fees to meet and keep up
with these requirements.  We do not solicit donations in locations
where we have not received written confirmation of compliance.  To
SEND DONATIONS or determine the status of compliance for any
particular state visit https://pglaf.org

While we cannot and do not solicit contributions from states where we
have not met the solicitation requirements, we know of no prohibition
against accepting unsolicited donations from donors in such states who
approach us with offers to donate.

International donations are gratefully accepted, but we cannot make
any statements concerning tax treatment of donations received from
outside the United States.  U.S. laws alone swamp our small staff.

Please check the Project Gutenberg Web pages for current donation
methods and addresses.  Donations are accepted in a number of other
ways including including checks, online payments and credit card
donations.  To donate, please visit: https://pglaf.org/donate


Section 5.  General Information About Project Gutenberg-tm electronic
works.

Professor Michael S. Hart was the originator of the Project Gutenberg-tm
concept of a library of electronic works that could be freely shared
with anyone.  For thirty years, he produced and distributed Project
Gutenberg-tm eBooks with only a loose network of volunteer support.

Project Gutenberg-tm eBooks are often created from several printed
editions, all of which are confirmed as Public Domain in the U.S.
unless a copyright notice is included.  Thus, we do not necessarily
keep eBooks in compliance with any particular paper edition.

Each eBook is in a subdirectory of the same number as the eBook's
eBook number, often in several formats including plain vanilla ASCII,
compressed (zipped), HTML and others.

Corrected EDITIONS of our eBooks replace the old file and take over
the old filename and etext number.  The replaced older file is renamed.
VERSIONS based on separate sources are treated as new eBooks receiving
new filenames and etext numbers.

Most people start at our Web site which has the main PG search facility:

     https://www.gutenberg.org

This Web site includes information about Project Gutenberg-tm,
including how to make donations to the Project Gutenberg Literary
Archive Foundation, how to help produce our new eBooks, and how to
subscribe to our email newsletter to hear about new eBooks.

EBooks posted prior to November 2003, with eBook numbers BELOW #10000,
are filed in directories based on their release date.  If you want to
download any of these eBooks directly, rather than using the regular
search system you may utilize the following addresses and just
download by the etext year.

     https://www.gutenberg.org/etext06

    (Or /etext 05, 04, 03, 02, 01, 00, 99,
     98, 97, 96, 95, 94, 93, 92, 92, 91 or 90)

EBooks posted since November 2003, with etext numbers OVER #10000, are
filed in a different way.  The year of a release date is no longer part
of the directory path.  The path is based on the etext number (which is
identical to the filename).  The path to the file is made up of single
digits corresponding to all but the last digit in the filename.  For
example an eBook of filename 10234 would be found at:

     https://www.gutenberg.org/1/0/2/3/10234

or filename 24689 would be found at:
     https://www.gutenberg.org/2/4/6/8/24689

An alternative method of locating eBooks:
     https://www.gutenberg.org/GUTINDEX.ALL
</Paragraph></ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={() => manageDialog()}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        </>
        
    );
}